import { useState } from "react";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

function MyDateRangePicker({ label, ...props }) {
  // date range picker component: https://react-spectrum.adobe.com/react-aria/DateRangePicker.html
  const [calIconClicked, setCalIconClicked] = useState(false);
  return (
    <DateRangePicker className="relative" {...props}>
      <Label className="flex justify-center text-lg">{label}</Label>
      <Group className="flex items-center w-fit min-w-[220px] max-w-full overflow-auto relative p-[8px] pl-[16px] bg-white border border-gray-500 hover:border-purple-500 rounded-md whitespace-nowrap">
        <DateInput slot="start" className="flex sm:m-1 tracking-wider">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end" className="flex sm:m-1 tracking-wider">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="text-2xl p-1">
          <BiCalendar
            className={`${calIconClicked ? "text-indigo-500" : "text-black"}`} // set icon color based on click
            onPointerDown={() => {
              setCalIconClicked(true);
            }}
            onPointerUp={() => {
              setCalIconClicked(false);
            }}
          />
        </Button>
      </Group>
      <Popover className="shadow-lg">
        <Dialog>
          <RangeCalendar
            className="bg-white border border-gray-500 rounded-md p-3"
            maxValue={today(getLocalTimeZone())} // get max date value based on current date
          >
            <header className="flex items-center justify-between w-full text-lg mb-1">
              <Button className="m-1 text-xl" slot="previous">
                <IoIosArrowDropleft />
              </Button>
              <Heading />
              <Button className="m-1 text-xl" slot="next">
                <IoIosArrowDropright />
              </Button>
            </header>
            <CalendarGrid>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={
                    ({
                      isOutsideMonth,
                      isHovered,
                      isSelected,
                      isSelectionStart,
                      isSelectionEnd,
                      isDisabled,
                    }) =>
                      `w-8 h-8 flex items-center justify-center 
                      ${
                        isOutsideMonth ? "opacity-0 pointer-events-none" : "" // hide days outside of month
                      } 
                      ${
                        isHovered && !isSelected
                          ? "text-indigo-500 font-semibold"
                          : ""
                      } 
                      ${
                        isSelectionStart || isSelectionEnd
                          ? "bg-indigo-500 text-white rounded-full z-10"
                          : ""
                      }
                      ${
                        isSelected && !isSelectionStart && !isSelectionEnd
                          ? "bg-indigo-200 text-indigo-700 rounded-none"
                          : ""
                      } 
                      ${
                        isSelectionStart && !isSelectionEnd
                          ? "rounded-r-none"
                          : ""
                      }
                      ${
                        isSelectionEnd && !isSelectionStart
                          ? "rounded-l-none"
                          : ""
                      }
                      ${isDisabled ? "text-gray-500" : ""}` // gray out future dates
                  }
                />
              )}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}

export default MyDateRangePicker;
