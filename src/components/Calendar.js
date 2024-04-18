import { useState } from 'react';
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const Calendar = () => {
  const [value, setValue] = useState(null);

//   const handleChange = (date) => {
//     setValue(date);
//   }
  return (
    <Group position="center">
      <DatePicker
        value={value}
        onChange={setValue}
        defaultDate={new Date(2022, 1)}
        minDate={new Date(2022, 1, 1)}
        maxDate={new Date(2022, 8, 1)}
      />
    </Group>
  );
};

export default Calendar;
