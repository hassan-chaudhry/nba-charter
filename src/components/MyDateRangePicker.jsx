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

function MyDateRangePicker({
  label,
  description,
  errorMessage,
  firstDayOfWeek,
  ...props
}) {
  return (
    <DateRangePicker className="relative" {...props}>
      <Label className="flex justify-center">{label}</Label>
      <Group className="flex items-center w-fit min-w-[220px] max-w-full overflow-auto relative p-[4px] pl-[8px] border border-gray-500 rounded-[6px] whitespace-nowrap">
        <DateInput slot="start" className="flex m-1 tracking-wider">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end" className="flex m-1 tracking-wider">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="bg-blue-500 text-white text-[0.857rem] ml-auto rounded-[4px] w-[1.4rem] h-[1.4rem] p-0.5">
          ▼
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
                    } ${isHovered ? "text-blue-500" : "text-black-500"} ${
                      isSelected ? "text-blue-500" : "text-black-500"
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
