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

function MyDateRangePicker({
  label,
  description,
  errorMessage,
  firstDayOfWeek,
  ...props
}) {
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
            className={`${calIconClicked ? "text-gray-400" : "text-black"}`}
            onPointerDown={() => {
              setCalIconClicked(true);
            }}
            onPointerUp={() => {
              setCalIconClicked(false);
            }}
          />
        </Button>
      </Group>
      <Popover>
        <Dialog>
          <RangeCalendar
            className="bg-white border border-gray-500 rounded-md p-3"
            maxValue={today(getLocalTimeZone())}
          >
            <header className="flex items-center justify-between w-full">
              <Button className="m-1" slot="previous">
                ◀
              </Button>
              <Heading />
              <Button className="m-1" slot="next">
                ▶
              </Button>
            </header>
            <CalendarGrid>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={({
                    isOutsideMonth,
                    isHovered,
                    isSelected,
                    isDisabled,
                  }) =>
                    `m-1 ${
                      isOutsideMonth ? "opacity-0 pointer-events-none" : ""
                    } ${isHovered ? "text-indigo-600" : "text-black-500"} ${
                      isSelected ? "text-indigo-600" : "text-black-500"
                    } ${isDisabled ? "text-gray-500" : "text-black-500"}`
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
