import TextareaAutosize from "react-textarea-autosize";

const CategoryInputs = ({ register, errors }) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="border p-1"
          {...register("name")}
        />
        <p className="text-red-600">{errors.name && "Name is required."}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <TextareaAutosize
          type="text"
          name="description"
          className="border p-2 min-h-[10rem]"
          {...register("description")}
        />
        <p className="text-red-600">
          {errors.description && "Description is required."}
        </p>
      </div>
    </>
  );
};

export default CategoryInputs;
