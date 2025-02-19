def validate_password(password):
    errors = []
    if len(password) < 6:
        errors.append("Password must be at least 6 characters long.")
    if not any(char.isdigit() for char in password):
        errors.append("The password must contain at least one digit.")
    if not any(char.isupper() for char in password):
        errors.append("The password should contain at least 1 uppercase character.")
    if not any(char.islower() for char in password):
        errors.append("The password must contain at least one lowercase letter.")
    if not any(char in "!@#$%^&*()-_=+[]{};:'\",<.>/?\\|`~" for char in password):
        errors.append("The password must contain at least one special character.")

    return ", ".join(errors) if errors else None
