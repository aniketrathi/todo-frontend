
import {UserService, AuthService, TodoService} from '@services';
import i18next from 'i18next';
import {RouteComponentProps} from 'react-router';

export interface AppDependenciesProps {
  userService: UserService;
  authService: AuthService;
  todoService: TodoService;
  translation: i18next.i18n;
}

export type AppProps = RouteComponentProps;
