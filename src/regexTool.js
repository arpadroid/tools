const RegexTool = {
    alphaLower: /^([a-z0-9]+)$/,
    alphaLowerEnforce: /[^a-z0-9]/,
    alphaLowerCommas: /^[a-z0-9,]+$/,
    alphaLowerCommasEnforce: /[^a-z0-9,]/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    float: /^([-+]?[0-9]*.?[0-9]+)$/,
    hourFormat: /([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
    length: /^.{[minLength],[maxLength]}$/,
    lengthEnforce: /^.{[minLength],[maxLength]}$/,
    machineName: /^([a-z0-9_]+)$/,
    machineNameEnforce: /[^a-z0-9_]/g,
    numeric: /^([0-9]+)$/,
    numericEnforce: /([^-0-9]+)/g,
    telephone: /^([^+])([0-9]{8,})$/,
    telephoneEnforce: /([^+0-9]+)/g,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    time: /^[0-9]{1,2}$|^[0-9]{1,2}(:[0-5][0-9]){1,2}$/,
    timeEnforce: /[^0-9:]$/
};

export default RegexTool;
