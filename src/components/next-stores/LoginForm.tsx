import {FormEvent} from 'react';

interface LoginFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  return (
    <form className='form' onSubmit={onSubmit}>
      <h2>Login</h2>
      <label htmlFor='email'>Email Address</label>
      <input type='email' name='email' />
      <label htmlFor='password'>Password</label>
      <input type='password' name='password' />
      <input className='button' type='submit' value='Log In' />
    </form>
  );
};

export default LoginForm;
