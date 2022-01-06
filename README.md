# utils
Utilities (JS)

usage:
```js
forEach(object, function);
xinspect(<printing in console?>, obj)
validateObject(obj, template)
```

forEach:
first parameter is the object (like a string, or a class) to loop over
second one is the function that will be called with (obj, objName, iteration(start=0), obj);

xinspect:
First parameter replaces HTML-linebreaks with \n if set to true
second is the object to inspect

validateObject:
first parameter is the object to validate, second one is the template.
The object has to have at least the same names incl. types for his Parameters. The value can be different. Object in the object will also be checked using this function.
