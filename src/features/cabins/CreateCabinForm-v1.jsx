import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

// two library (react hook form & react query)

function CreateCabinForm() {
	const queryClient = useQueryClient();

	const { register, handleSubmit, reset, getValues, formState } = useForm();
	// getting the errors from  the api
	const { errors } = formState;
	console.log(errors);

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
		mutate(data);
	}
	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(OnSubmit, onError)}>
			<FormRow>
				<Label htmlFor="name">cabin name</Label>
				<Input
					type="text"
					id="name"
					{...register("name", {
						required: "this field is required",
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "this field is required",
						min: { value: 1, message: "the value should be at least 1" },
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", {
						required: "this field is required",
						min: { value: 1, message: "the value should be at least 1" },
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
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
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for website</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "this field is required",
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput id="image" accept="image/*" />
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
