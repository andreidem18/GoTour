export const getFormData = (object: Object) => {

    const formData = new FormData();

    Object.entries(object).forEach(
        ([key, value]: any[]) => {
            if (Array.isArray(value) && value[0] instanceof File) {
                value.forEach(f => {
                    formData.append(key, f);
                })
                return;
            }
            formData.set(key, value);
        }
    )
    return formData;
}