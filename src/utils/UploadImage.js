export const uploadImage = (formData, onResult, onError) => {
    fetch(
        "https://api.imgbb.com/1/upload?key=3f27eab09a290dd1707c4f384a17668d",
        {
            method: "POST",
            body: formData
        }
    )
        .then((response) => response.json())
        .then((result) => {
            onResult(result)
        })
        .catch((error) => {
            onError(error)
        });
}