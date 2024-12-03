export const AddWork = ({index}) => {
  return (
    <fieldset className="formInner" name={`works`}>
      
      
      
      <label htmlFor="workName" className="workName">
        <span>Наименование работы:</span>
        <input name="workName" id="workName"></input>
      </label>
      <label htmlFor="workDescription" className="description">
      <span>Описание работы:</span>
        <textarea name="workDescription" id="workDescription" />
      </label>
      
      <div className="imagesInputs">
        <label htmlFor="imageInput">
          <span>Загрузите 1 изображение:</span>
          <input
            type="file"
            accept="image"
            id="imageInput1"
            name="imageInput1"
          />
        </label>
        <label htmlFor="imageInput">
          <span>Загрузите 2 изображение:</span>
          <input
            type="file"
            accept="image"
            id="imageInput2"
            name="imageInput2"
          />
        </label>
        <label htmlFor="imageInput">
          <span>Загрузите 3 изображение:</span>
          <input
            type="file"
            accept="image"
            id="imageInput3"
            name="imageInput3"
          />
        </label>
      </div>

    </fieldset>
  );
};
