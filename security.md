# Security

## Observings
Upon submiting the form with `<img src=x onerror="alert('XSS')">` an alert box shows up with just a string of `XSS`. What is more important here is that malicous users can use this to execute any script and harm the website/company.

After adding a sanitizer the malicous code can't even be added. The sanitizer does it job and does not let non-allowed tags be submitted. What's also important is that it converts it to string, so even `<img src=x onerror="alert('XSS')">` will do nothing if added as it will have no meaning.

## auth token storage
they should definetly be stored in http only cookies. Any data we don't want to expose lives there. I the case of the current project I cannot set it up, as I don't have a backend, and it is only for learning purposes. So a local storage would be fine. And I added sanitazion. Even the login form does not trigger `<img src=x onerror="alert('XSS')">`. 
Regarding general tradeoffs local storage would be used for something like themes, open-closed states, session storage for something like  input(*todo*) savings. httponly cookies for user data, ids, role, etc. 


## ENV variables
In the bundle the REACT_APP_PUBLIC_KEY is exposed. This is by desgin. Keys prefixed with REACT_APP_ are meant to be safe to expose. All other should be kept secret. That's why they used such a verbouse way of doing this, to not make a mistake.


## QnA

### What is XSS and why is dangerouslySetInnerHTML dangerous without sanitisation?
cross-site-scripting is a way of adding malicious script to a site which could execute any client side JS. Used with unsanitized input fields for example to execute.
### What does DOMPurify.sanitize() actually do to the input?
it converts all to a string, and we can set boundaries what we can add to the input.
### Why can a script in localStorage steal your auth token but not one in an httpOnly cookie?
localstorage can be retrived with JS, which httponly cookies cant
### Why does REACT_APP_ prefix matter in Create React App?
so that we are more aware what variables are exposed to the client side, and secret keys are not exposed