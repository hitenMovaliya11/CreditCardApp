import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Logo=(props)=> {
  return (
    <Svg
      width={115}
      height={134}
      viewBox="0 0 115 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.032.61c-4.799 1.25-8.093 3.373-12.792 8.24-7.72 8-13.319 19.99-16.38 35.073-1.344 6.63-1.878 10.89-2.216 17.7-.853 17.16 2.12 34.637 8.196 48.171 3.613 8.051 8.766 15.192 13.453 18.645 10.924 8.049 20.587 7.321 31.576-2.379l1.44-1.271-1.466-2.177c-3.705-5.499-7.14-12.75-9.434-19.908-3.169-9.894-4.672-19.567-4.953-31.876-.54-23.678 4.356-43.526 14.48-58.7l1.637-2.452-.792-.958c-1.973-2.386-6.45-5.66-9.711-7.102C41.209-.092 36.21-.478 32.032.61zM52.869.259c0 .164.76.881 1.688 1.593 2.486 1.909 6.984 6.715 9.238 9.874 1.086 1.522 2.957 4.677 4.157 7.01 3.768 7.325 5.938 13.756 8.345 24.73l.514 2.342 18.698.075 18.698.076-.003-.807c-.004-1.393-1.718-9.122-2.833-12.777-4.573-14.988-13.053-26.522-22.404-30.473C84.864.167 85.381.213 68.497.082 58.008 0 52.869.059 52.869.258zm23.633 88.79c-.066.201-.271 1.156-.456 2.122-1.949 10.183-5.958 20.865-10.698 28.501-2.912 4.691-7.498 9.739-11.773 12.957l-1.688 1.27 15.239.078c17.16.088 17.745.036 21.979-1.942 9.629-4.5 16.763-13.91 21.6-28.488.787-2.37 1.641-5.202 1.898-6.294.596-2.526 1.897-8.334 1.897-8.468 0-.056-8.522-.102-18.939-.102-14.89 0-18.964.078-19.059.366z"
        fill="#EEE"
      />
    </Svg>
  )
}

export default Logo
