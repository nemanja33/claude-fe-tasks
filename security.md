# Security

## Observings
Upon submiting the form with `<img src=x onerror="alert('XSS')">` an alert box shows up with just a string of `XSS`. What is more important here is that malicous users can use this to execute any script and harm the website/company.

After adding a sanitizer the malicous code can't even be added. The sanitizer does it job and does not let non-allowed tags be submitted. What's also important is that it converts it to string, so even `<img src=x onerror="alert('XSS')">` will do nothing if added as it will have no meaning.