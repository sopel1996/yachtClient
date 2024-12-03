import { useEffect, useState, useContext } from "react";
import styles from "./style.module.css";
import cn from "classnames";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AddWork } from "../addWork";
import yachtNameLogo from "../../../public/assets/ALMA_Logo.png";
import yachtHull from "../../../public/assets/yacht.png";

export const PDFGenerator = ({}) => {
  pdfMake.addVirtualFileSystem(pdfFonts);
  const [components, setComponents] = useState([]);

  const [yachtNameLogoDataURL, setYachtNameLogoDataURLDataURL] = useState(null);
  const [yachtHullDataURL, setYachtHullDataURL] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  useEffect(() => {
    // Загружаем изображение через fetch
    fetch(yachtNameLogo)
      .then((response) => {
        // Проверяем, что ответ успешный
        if (!response.ok) {
          throw new Error("Сетевая ошибка при загрузке изображения");
        }
        return response.blob(); // Возвращаем Blob из ответа
      })
      .then((blob) => {
        const reader = new FileReader();

        // Когда чтение завершено, обновляем состояние
        reader.onloadend = () => {
          setYachtNameLogoDataURLDataURL(reader.result); // Устанавливаем dataURL в состояние
        };

        // Читаем Blob как dataURL
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Ошибка:", error); // Обработка ошибок
      });

    fetch(yachtHull)
      .then((response) => {
        // Проверяем, что ответ успешный
        if (!response.ok) {
          throw new Error("Сетевая ошибка при загрузке изображения");
        }
        return response.blob(); // Возвращаем Blob из ответа
      })
      .then((blob) => {
        const reader = new FileReader();

        // Когда чтение завершено, обновляем состояние
        reader.onloadend = () => {
          setYachtHullDataURL(reader.result); // Устанавливаем dataURL в состояние
        };

        // Читаем Blob как dataURL
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Ошибка:", error); // Обработка ошибок
      });

    const startWeek = new Date();
    const endWeek = new Date();
    if (startWeek.getDay() === 0) {
      startWeek.setDate(startWeek.getDate() - 6);
    } else {
      startWeek.setDate(startWeek.getDate() - startWeek.getDay() + 1);
      endWeek.setDate(endWeek.getDate() + (7 - endWeek.getDay()));
    }
    setDateFrom(startWeek.toISOString().split("T")[0]);
    setDateTo(endWeek.toISOString().split("T")[0]);
  }, []); // Пустой массив зависимостей, чтобы выполнить один раз при монтировании

  const addComponent = (e) => {
    e.preventDefault();
    setComponents([...components, components.length]);
  };

  let getBase64ImageFromURL = function (data, isStatic) {
    if (data) {
      let url = isStatic ? data : URL.createObjectURL(data);
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
          var canvas = document.createElement("canvas");
          var width = img.width > img.height ? 200 : 150;
          var height = img.height > img.width ? 200 : 150;
          canvas.width = width;
          canvas.height = height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          var dataURL = {
            dataURL: canvas.toDataURL(data.type),
            width: canvas.width,
            height: canvas.height,
          };

          resolve(dataURL);
        };

        img.onerror = (error) => {
          reject(error);
        };

        img.src = url;
      });
    }
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  };

  let generateImgsUrl = (data) => {
    return data.map((el) => {
      return el
        ? {
            image: el.dataURL,
            width: el.width,
            height: el.height,
          }
        : null;
    });
  };

  let fun = (e) => {
    e.preventDefault();
    let works = e.target.works,
      dateFromString = `${dateFrom.split("-")[2]}.${dateFrom.split("-")[1]}.${
        dateFrom.split("-")[0]
      }`,
      dateToString = `${dateTo.split("-")[2]}.${dateTo.split("-")[1]}.${
        dateTo.split("-")[0]
      }`;

    if (!(works instanceof RadioNodeList)) {
      works = [].concat(works);
    } else {
      works = Array.from(works);
    }

    let allWorkPromise = works.map((el) => {
      if (el === undefined) return;
      const {
        elements: {
          imageInput1,
          imageInput2,
          imageInput3,
          workName,
          workDescription,
        },
      } = el;

      let img1 = getBase64ImageFromURL(
          imageInput1.files.length ? imageInput1.files[0] : null
        ),
        img2 = getBase64ImageFromURL(
          imageInput2.files.length ? imageInput2.files[0] : null
        ),
        img3 = getBase64ImageFromURL(
          imageInput3.files.length ? imageInput3.files[0] : null
        );

      return Promise.all([img1, img2, img3]).then(function (data) {
        return new Promise((resolve, reject) => {
          resolve({
            images: generateImgsUrl(data),
            workName: workName.value,
            workDescription: workDescription.value,
          });
        });
      });
    });

    Promise.all(allWorkPromise).then(function (data) {
      let rows = [];
      data.forEach((workInfo, index) => {
        if (workInfo === undefined) return false;
        rows.push([
          index + 1,
          workInfo.workName,
          [
            workInfo.workDescription,
            {
              columns: workInfo.images,
            },
          ],
        ]);
      });

      var dd = {
        pageOrientation: "landscape",
        content: [
          {
            columns: [
              {
                image: yachtNameLogoDataURL,
                width: 198,
                height: 55,
              },
              {
                image: yachtHullDataURL,
                width: 218,
                height: 134,
                margin: [70, 0],
              },
              {
                image: yachtNameLogoDataURL,
                width: 198,
                height: 55,
                margin: [140, 0],
              },
            ],
          },
          {
            text: "Engine department",
            style: "header",
            margin: [0, 0, 0, 20],
          },
          {
            text: `Weekly report : from ${dateFromString} to ${dateToString}`,
            style: "date",
            margin: [0, 0, 0, 20],
          },

          {
            style: "tableExample",
            table: {
              widths: [20, 100, "*"],
              body: [["№", "Job", "Comments/Photo"], ...rows],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
          },
          date: {
            fontSize: 15,
            bold: true,
          },
          subheader: {
            fontSize: 12,
            bold: true,
          },
          quote: {
            italics: true,
          },
          small: {
            fontSize: 8,
          },
        },
        defaultStyle: {
          columnGap: 10,
        },
      };

      pdfMake.createPdf(dd).download(`weekly_report_${dateFromString}.pdf`);
      // pdfMake.createPdf(dd).open();
    });
  };
  return (
    <div className={cn("sectionInner", styles.formPage)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fun(e);
        }}
        className={styles.form}
      >
        <div className={styles.datesInputs}>
          <label htmlFor="dateFrom">
            <span>Дата начала</span>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              value={dateFrom}
              onChange={handleDateFromChange}
            ></input>
          </label>
          <label htmlFor="dateTo">
            <span>Дата окончания</span>
            <input
              type="date"
              name="dateTo"
              id="dateTo"
              value={dateTo}
              onChange={handleDateToChange}
            ></input>
          </label>
        </div>

        {components.map((index) => (
          <AddWork key={index} index={index} />
        ))}
        <div className={styles.btnWrapper}>
          <button onClick={addComponent}>Добавить компонент</button>

          <button type="submit">Генерация PDF</button>
        </div>
      </form>
    </div>
  );
};
