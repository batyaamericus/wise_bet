import Ajv from "ajv";
import addFormat from "ajv-formats";

const ajv = new Ajv({$data: true});
addFormat(ajv);

function validation(schema){
  
  return (req, res, next)=> {
    console.log("validating data",req.body);
    const validate = ajv.compile(schema);
    delete (req.body).userId;
    const valid = validate(req.body);
    if (valid) {
        console.log("Validated text")
        next(); 
    } else {
        console.log(validate.errors[0]);
        res.status(400).send(`${validate.errors[0].instancePath} ${validate.errors[0].message}`);
    }
  }
}

export default validation;