// "use server";

// import { utapi } from "@/app/server/uploadthing";

// // TODO: check the size of the uploaded file
// export async function uploadThingByUrl(fileUrl: string) {

// 	if (!fileUrl) {
// 			return null;
// 	}
// 	const uploadedFile  = await utapi.uploadFilesFromUrl(fileUrl);
// 		if (!uploadedFile) {
// 			throw new Error("Failed to upload file");	
// 		}
// 		if (!uploadedFile.data?.url) {
// 			throw new Error("Failed to get url");
// 		}
// 		console.log("uploadedFile", uploadedFile);
// 		return uploadedFile.data?.url;
// 	};

// // export const deleteThing = 