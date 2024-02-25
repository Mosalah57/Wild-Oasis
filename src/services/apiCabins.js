import supabase, { supabaseUrl } from "./supabase";

// fetching data
export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		throw new Error("cabins could not be loaded");
	}
	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Create/Edit cabin
	let query = supabase.from("cabins");
	// const { data, error } = await supabase
	// 	.from("cabins")
	// 	.insert([{ ...newCabin, image: imagePath }]);
	// A) create cabin
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B) Edit cabin
	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	}
	const { data, error } = await query.select().single();

	if (error) {
		throw new Error("cabins could not be created");
	}
	// uploading image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);
	// delete the cabin if there is an error uploading image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		throw new Error(
			"cabin image could not be uploaded and the cabin was not created"
		);
	}
	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
	return data;
}
