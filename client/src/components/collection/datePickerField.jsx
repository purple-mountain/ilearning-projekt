import { DatePicker } from "antd"
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

function DatePickerField(props) {
    return (
        <Controller
            control={props.control}
            name={props.name}
            rules={{
                required: "This field is required"
            }}
            render={({ field, fieldState }) => {
                return (
                    <>
                        <DatePicker
                            status={fieldState.error ? "error" : undefined}
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => {
                                field.onChange(date ? date.valueOf() : null);
                            }}
                        />
                        <br />
                        {fieldState.error ? (
                            <span style={{ color: "red" }}>{fieldState.error?.message}</span>
                        ) : null}
                    </>
                );
            }}
        />
    );
}

export { DatePickerField }
