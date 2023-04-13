function validateFields(full_name, phone, city, state, email, password, user_type,) {
    let errorArray = []
    //#region length === 0
    if (full_name.length < 6) {
        errorArray.push(false)
    }
    if (email.length < 6) {
        errorArray.push(false)
    }
    if (password.length < 6) {
        errorArray.push(false)
    }
    if (phone.length < 6) {
        errorArray.push(false)
    }
    if (city.length < 6) {
        errorArray.push(false)
    }
    if (state.length < 2) {
        errorArray.push(false)
    }
    if (full_name.length < 6) {
        errorArray.push(false)
    }
    return errorArray
    //#endregion
}