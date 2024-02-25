import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		// so we can add optional data in the newly created user
		options: {
			data: {
				fullName,
				avatar: "",
			},
		},
	});
	if (error) throw new Error(error.message);

	return data;
}

export async function Login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	// get user from localStorage
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	// fetch the current user from supabase
	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };
	// update password || fullName  as they in different forms
	const { data, error } = await supabase.auth.updateUser({
		updateData,
	});
	if (error) throw new Error(error.message);
	if (!avatar) return data;

	//upload the avatar img
	const fileName = `avatar-${data.user.id}-${Math.random()}`;
	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	//update the avatar in the user
	const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fullName}`,
		},
	});

	if (error2) throw new Error(error2.message);
	return updatedUser;
}
