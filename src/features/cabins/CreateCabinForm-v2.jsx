import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

// two library (react hook form & react query)

function CreateCabinForm() {
	const queryClient = useQueryClient();

	const { register, handleSubmit, reset, getValues, formState } = useForm();
	// getting the errors from  the api
	const { errors } = formState;
	// console.log(errors);

	// to update
	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: (newCabin) => createCabin(newCabin),
		// mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// invalidate so after the mutation of cabins the component will re-render
			queryClient.invalidateQueries({ queryKey: "cabins" });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function OnSubmit(data) {
		// console.log(data);
		mutate({ ...data, image: data.image[0] });
	}
	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(OnSubmit, onError)}>
			<FormRow label="CabinName" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating}
					{...register("name", {
						required: "this field is required",
					})}
				/>
			</FormRow>

			<FormRow label="maxCapacity" error={errors?.name?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					{...register("image", {
						required: "this field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
