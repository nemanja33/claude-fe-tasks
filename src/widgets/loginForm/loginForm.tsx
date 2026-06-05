import { RefObject, SyntheticEvent, useId, useReducer, useRef } from 'react';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import './form.css'
import { useAppDispatch } from '../../redux/hooks';
import { signIn } from '../../redux/features/user/userSlice';

type FormStatus = 'idle' | 'loading' | 'success' ;

interface FormState {
    status: FormStatus;
    email: string;
    password: string;
    emailError?: string;
    passwordError?: string;
}

const initState: FormState = {
    status: 'idle',
    email: '',
    password: '',
    emailError: undefined,
    passwordError: undefined,
}

type Action = 
    | { type: "SET_STATUS", payload: FormStatus }
    | { type: "SET_EMAIL", payload: string }
    | { type: "SET_PASSWORD", payload: string }
    | { type: "SET_EMAIL_ERROR", payload: string | undefined }
    | { type: "SET_PASSWORD_ERROR", payload: string | undefined }

type LookupTable = {
    [A in Action as A['type']]: (state: FormState, payload: A['payload']) => FormState
}

const VALID = true;

const validEmailFormat = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validateEmail(email: string, cb: (a: Action) => void) {
    if (!email.length) {
        cb({type: "SET_EMAIL_ERROR", payload: 'Email cannot be empty'})
        return !VALID;
    } 
    if (!validEmailFormat(email)) {
        cb({type: "SET_EMAIL_ERROR", payload: 'Please use a valid email format'})
        return !VALID;

    }
    cb({type: "SET_EMAIL_ERROR", payload:  undefined});
    return VALID
}
function validatePassword(password: string, cb: (a: Action) => void) {
    if (!password.length) {
        cb({type: "SET_PASSWORD_ERROR", payload: 'Password cannot be empty'});
        return !VALID;
    }
    if (password.length < 8) {
        cb({type: "SET_PASSWORD_ERROR", payload: 'Password must be at least 8 characters long'})
        return !VALID;
    }
    cb({type: "SET_PASSWORD_ERROR", payload: undefined});
    return VALID
}

const lookupTable: LookupTable = {
    'SET_STATUS': (state, payload) => ({...state, status: payload}),
    'SET_EMAIL': (state, payload) => ({...state, email: payload}),
    'SET_EMAIL_ERROR': (state, payload) => ({...state, emailError: payload}),
    'SET_PASSWORD': (state, payload) => ({...state, password: payload}),
    'SET_PASSWORD_ERROR': (state, payload) => ({...state, passwordError: payload}),
}

function reducer(state: FormState, action: Action) {
    const handler = lookupTable[action.type] as (state: FormState, payload: Action['payload']) => FormState
    return handler(state, action.payload)
}

function focusElement(ref: RefObject<HTMLInputElement | null>) {
    ref?.current?.focus()
}

const LoginForm = () => {
    const [state, stateDispatch] = useReducer(reducer, initState);
    const reduxDispatch = useAppDispatch();
    const headingId = useId();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    function submitMock(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const emailValid = validateEmail(state.email, stateDispatch);
        const passwordValid = validatePassword(state.password, stateDispatch);
        
        if (!emailValid) {
            return focusElement(emailRef)
        }
        if (!passwordValid) {
            return focusElement(passwordRef)
        }

        stateDispatch({type: "SET_STATUS", payload: 'loading'});
        
        setTimeout(() => {
            stateDispatch({type: "SET_STATUS", payload: 'success'});
            // I don't have login logic set up. For now you log in as a fixed user with the username `Cyber Dragon`.
            // In a real scenario BE would check if a user with the typed email exists and look up in the DB what the username is to print.
            reduxDispatch(signIn("Cyber Dragon"))
        }, 1500);
    }

    return (
        <>
            <h2 id={headingId}>Sign in</h2>
            <form onSubmit={submitMock} aria-labelledby={headingId}>
                <Input
                    label='email'
                    type='email'
                    error={state.emailError}
                    hint='Please use a valid email.'
                    onChange={(e) => stateDispatch({type: "SET_EMAIL", payload: e.target.value})}
                    onBlur={(e) => validateEmail(e.target.value, stateDispatch)}
                    ref={emailRef}
                />
                <Input
                    label='password'
                    type='password'
                    error={state.passwordError}
                    hint='Password must be at least 8 characters long.' 
                    onChange={(e) => stateDispatch({type: "SET_PASSWORD", payload: e.target.value})}
                    onBlur={(e) => validatePassword(e.target.value, stateDispatch)}
                    ref={passwordRef}
                />
                <Button
                    variant='primary'
                    size='md'
                    type='submit'
                    isLoading={state.status === 'loading'}
                >
                    Submit
                </Button>
            </form>
            {
                <span className='form__success' role="status" aria-live="polite">
                    {state.status === 'success' && "Successfully signed in!"}
                </span>
            }
        </>
    )
};

export { LoginForm }
