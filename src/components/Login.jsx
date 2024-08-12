import { Form } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <section className="login-section flex h-screen-minus-nav items-center justify-center">
        <Form className="flex flex-col p-8 gap-4 border rounded">
          <label htmlFor="email">
            Email
            <input className="rounded p-3 mt-2 w-full" type="text" name="email" />
          </label>
          <label htmlFor="password">
            Password
            <input className="rounded p-3 mt-2 w-full" type="password" name="password" />
          </label>
        </Form>
      </section>
    </>
  );
}
