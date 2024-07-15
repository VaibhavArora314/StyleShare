import "@material-tailwind/react";
import { Checkbox, CheckboxProps } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

interface RippleCheckboxProps extends CheckboxProps {
  innertext: string;
}

function RippleCheckbox(props: RippleCheckboxProps) {
  const { t } = useTranslation();
  let text = props.innertext;
  return (
    <div className="w-full pt-5 px-4 mx-auto">
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="ripple-on"
        >
          <Checkbox
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            id="ripple-on"
            ripple={true}
            {...props}
            className="peer relative h-5 w-5 cursor-pointer font-bold appearance-none rounded-md border border-black dark:border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-700 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <label
          className="cursor-pointer select-none font-semibold text-black dark:text-white dark:bg-[#000435]"
          htmlFor="ripple-on"
        >
          {t(text)}
        </label>
      </div>
    </div>
  );
}

export default RippleCheckbox;
