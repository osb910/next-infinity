interface SecondHandProps {
  stroke?: string;
  [key: string]: any;
}

const SecondHand = ({stroke, ...delegated}: SecondHandProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // width='937.5'
      // height='937.5'
      preserveAspectRatio='xMinYMin meet'
      {...delegated}
    >
      <path
        stroke={'#000'}
        stroke-width='2.5pt'
        d='m481.359 471.43.242-1.669.022-1.686 356.854-115.949 14.411-8.19-16.472 1.844-356.855 115.949-1.009-1.351-1.176-1.208-1.325-1.044-1.449-.862-1.549-.665-1.623-.458-1.669-.242-1.686-.022-1.674.198-1.634.415-1.567.625-1.471.824-1.351 1.009-1.208 1.176-1.044 1.325-.862 1.449-.665 1.549-.458 1.623-.242 1.669-.022 1.686.198 1.674.415 1.634.625 1.567.824 1.471 1.009 1.351 1.176 1.208 1.325 1.044 1.449.862 1.549.665 1.623.458 1.669.242 1.686.022 1.674-.198 1.634-.415 1.567-.625 1.471-.824 1.351-1.009 1.208-1.176 1.044-1.325.862-1.449.665-1.549z'
      />
    </svg>
  );
};

export default SecondHand;