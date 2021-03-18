import * as React from 'react';
import i18next from 'i18next';

import {UserServiceImpl, UserService, AuthService, AuthServiceImpl, TodoServiceImpl, TodoService} from '@services';

import {AppDependenciesProps} from './dependencies.props';
import i18n from './i18n';

const userService: UserService = new UserServiceImpl();
const authService: AuthService = new AuthServiceImpl();
const todoService: TodoService = new TodoServiceImpl();
const translation: i18next.i18n = i18n;


export const getDependencies = (): AppDependenciesProps => {
  return {
    userService,
    translation,
    authService,
    todoService,
  };
}

const DIContext = React.createContext<AppDependenciesProps>(getDependencies());

export default DIContext;
