const isEmail = (email: string): boolean =>
  !!email.match(
    /\b[-\w!#$%&'*+\/=?^_`{|}~]+(?:\.[-\w!#$%&'*+\/=?^_`{|}~]+)*@(?:\w(?:[-\w]*\w)?\.)+\w(?:[-\w]*\w)?\b/
  );

export {isEmail};
