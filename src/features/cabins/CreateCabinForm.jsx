import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";

// two library (react hook form & react query)

function CreateCabinForm({ onCloseModal, cabinToEdit = {} /*default*/ }) {
	const { isEditing, editCabin } = useEditCabin();
	const { isCreating, createCabin } = useCreateCabin();
	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId); // if there is editId (true)

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	// getting the errors from  the api
	const { errors } = formState;
	// console.log(errors);

	function OnSubmit(data) {
		console.log(data);
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						reset(); /*we can use onSuccess multiple times*/
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						reset(); /*we can use onSuccess multiple times*/
						onCloseModal?.();
					},
				}
			);
		// mutate({ ...data, image: data.image[0] });
	}
	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(OnSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}>
			<FormRow label="CabinName" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "this field is required",
					})}
				/>
			</FormRow>

			<FormRow label="maxCapacity" error={errors?.name?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "this field is required",
						min: { value: 1, message: "the value should be at least 1" },
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.name?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					defaultValue={0}
					{...register("regularPrice", {
						required: "this field is required",
						min: { value: 1, message: "the value should be at least 1" },
					})}
				/>
			</FormRow>
			<FormRow label="discount" error={errors?.name?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "this field is required",
						// custom validate so we can make sure that discount smaller than the price
						validate: (value) =>
							value <= getValues().regularPrice ||
							"discount should be less than regular price   ",
					})}
				/>
			</FormRow>

			<FormRow label="cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					// type="file" for individual use
					{...register(
						"image",
						isEditSession ? false : { required: "this field is required" }
					)}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={
						() =>
							onCloseModal?.() /*if there wasn't onCloseModal then this won't be called */
					}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit Cabin" : "Add New cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
