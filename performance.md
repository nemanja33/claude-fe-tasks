# Performance report

## Lighthouse

### Performance
- Initial Score 99

- Issues:
Use efficient cache lifetimes Est savings of 395 KiB.
This is BE which is not covered with just React.

Minify JavaScript Est savings of 89 KiB.
Build of React should minify this, development does not.

Reduce unused JavaScript Est savings of 175 KiB
localhost 1st party
…js/bundle.js(localhost)
Transfer Size 376.8 KiB
Est Savings 174.6 KiB
E:/z/claude-fe-tasks/node_modules/react-dom/cjs/react-dom-client.development.js
Transfer Size 155.6 KiB
Est Savings 58.0 KiB
E:/z/claude-fe-tasks/node_modules/react-router/dist/development/chunk-5KNZJZUH.mjs
Transfer Size 65.7 KiB
Est Savings 56.7 KiB
E:/z/claude-fe-tasks/webpack/runtime/jsonp chunk loading
Transfer Size 4.4 KiB
Est Savings 3.6 KiB
E:/z/claude-fe-tasks/node_modules/react/cjs/react.development.js
Transfer Size 7.2 KiB
Est Savings 3.1 KiB
E:/z/claude-fe-tasks/node_modules/react-dom/cjs/react-dom.development.js
Transfer Size 2.6 KiB
Est Savings 2.3 KiB
I can't affect any of these, all are node modules.


Page prevented back/forward cache restoration 1 failure reason
I opened application tab and under Background Services opened Back/forward cache tab and pressed the button Test back/forward cache and the message was
Pages with WebSocket cannot enter back/forward cache.
WebSocket

2 files
bundle.js:20219:19bundle.js:20219:19
Is this comming from React?

### Accessibility
- Initial Score 98
Document does not have a main landmark. Added
The page contains a heading, skip link, or landmark region. Added - I had to use a default `a` tag, from what I gathered react-router-dom does not handle that.

- Score after improvements 100

### Best Practices
- Initial Score 100
 
## Performance Tab
- Hovering the input field rerenders the input. Typing something rerenders the input field and the user list.

##  React DevTools Profile
- The slowest render is UserItem (Memo) key="7" (0.7ms).





## Rerenders
### Are all re-renders in the user list necessary?
### Does the filter input trigger renders it shouldn't?
I believe the filter input works correctly as all of the items need to rerender on search.
One thing I think should not work as it does currently is the rerendering of the list if one user info is expanded. Should only rerender that item.
- What I have done is moved the useGetPosts() inside the UserItem and set a boolean state to show/hide the menu. I really feel this is better, as users don't need to wait for accordion data to load, and it does not rerender the whole list.

### Are images or assets unoptimised?
For a real project I would not use a random SVG from the web, but seems to work properly, as nothing was reported for it.

### Is the initial bundle larger than it needs to be?
Hm, tricky question. I get bundle reports, but for node_modules. Can't really change those, and I think the build will be smaller anyways.




### What were your Lighthouse scores before?
It's above in the document

### What did you find in the Profiler?
It's above in the document

### What two things did you change and why?
It's above in the document

### What were your scores after?
It's above in the document





### Lighthouse measures Core Web Vitals — LCP, CLS, FID/INP. What does each one measure?
LCP - Largest Contenful Paint, measures the part of the webiste that needs the most time to load.
CLS - Cumulative Layout Shift, measures if something on the page moved after the initial load. That's why we need to add dimensions to images.
FID/INP - I guess you mean Time To First Byte, as first input delay is deprecated. Measures the time needed to interact with the website

The React Profiler shows commit duration — what does that mean?
/

What is the difference between a paint and a layout?
Layout should be the HTML placed on the site, and paint the styling. Something like that



MY QUESTIONS
- Sources to learn more about the profiler and how to use it.
- Sources to learn React DevTools and how to use them.
- Sources to learn paint, layout, etc.

