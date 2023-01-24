import React, { useMemo } from "react";

interface PetalGeneratorProps {
  /* [ 10, 4, 40 ,10... ] */
  list_of_minutes: number[];
  max_categories: number;
  category_color: string;
  width?: number;
  height?: number;
}

export function PetalGenerator(props: PetalGeneratorProps) {
  function categorize_minutes(
    list_of_minutes: typeof props.list_of_minutes
  ): [number, number, number] {
    /** [5 mins, 10 mins, 15 mins] */
    const categorized_minutes_list: [number, number, number] = [0, 0, 0];

    list_of_minutes.forEach((minute: number) => {
      if (minute <= 5 && minute > 0) {
        categorized_minutes_list[0] = categorized_minutes_list[0] + 1;
      }
      if (minute <= 10 && minute > 5) {
        categorized_minutes_list[1] = categorized_minutes_list[1] + 1;
      }
      if (minute <= 15 && minute > 10) {
        categorized_minutes_list[2] = categorized_minutes_list[2] + 1;
      }
    });

    return categorized_minutes_list;
  }

  function pedal_generator(
    max_categories: typeof props.max_categories,
    nr_categories_per_group: [number, number, number]
  ) {
    const coefficients = [1, 1.5, 2];
    const opacities = [];

    // calculate opacities
    nr_categories_per_group.forEach((current_category_fallings_inside, index) => {
      const nr_cats_falling_inside = current_category_fallings_inside;
      const nr_cats_in_percentage = nr_cats_falling_inside / max_categories;
      opacities[index] = (90 / coefficients[index]) * nr_cats_in_percentage;
    });

    return opacities;
  }

  const ratios = useMemo(() => {
    return pedal_generator(
      props.max_categories,
      categorize_minutes(props.list_of_minutes)
    );
  }, [props.list_of_minutes, props.max_categories]);

  return (
    <svg
      width={props.width || 145}
      height={props.height || 144}
      viewBox="0 0 145 144"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.category_color}
        fillOpacity={`${ratios[0]}%`}
        d="M21.6685 66.9383C11.9228 57.0695 2.60411 46.4112 8.16045 39.1337C13.6763 31.9329 32.3603 33.1078 47.213 37.4702C61.9854 41.7999 72.886 49.3936 73.3101 58.6366C73.6538 67.847 64.2047 73.0143 53.2787 76.4346C42.2923 79.8769 31.4548 76.7305 21.6685 66.9383Z"
      />
      <path
        fill={props.category_color}
        fillOpacity={`${ratios[1]}%`}
        d="M30.3533 85.4639C15.2146 69.0898 0.684436 51.4598 8.73655 39.957C16.731 28.5759 44.9581 31.3116 67.5507 39.0226C90.0209 46.6773 106.799 59.4293 107.853 74.3746C108.785 89.2636 94.7678 97.1841 78.4455 102.217C62.0332 107.283 45.5498 101.716 30.3533 85.4639Z"
      />
      <path
        fill={props.category_color}
        fillOpacity={`${ratios[2]}%`}
        d="M36.504 99.2393C16.8259 77.5634 -2.08163 54.2438 8.16745 39.2174C18.3436 24.3504 54.7354 28.2483 83.9224 38.6225C112.951 48.9214 134.702 65.8561 136.221 85.5034C137.581 105.075 119.61 115.331 98.6371 121.768C77.549 128.248 56.255 120.756 36.504 99.2393Z"
      />
    </svg>
  );
}
