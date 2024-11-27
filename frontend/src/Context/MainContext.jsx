import React from 'react';
import { LoginProvider } from './LoginContext';
import { RequestPasswordProvider } from './RequestPasswordContext';
import { ResetPasswordProvider } from './ResetPasswordContext';
import { UserProvider } from './UserContext';
import { ChangePasswordProvider } from './ChangePasswordContext';

const MainProvider = ({ children }) => {
    return (
        <LoginProvider>
            <RequestPasswordProvider>
                <ResetPasswordProvider>
                    <UserProvider>
                        <ChangePasswordProvider>
                            {children}
                        </ChangePasswordProvider>
                    </UserProvider>
                </ResetPasswordProvider>
            </RequestPasswordProvider>
        </LoginProvider>
    );
};

export { MainProvider };
