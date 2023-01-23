import React, { memo } from "react";

import { useAppSelector } from "@hooks/context";

import { FLOWER_CATEGORIES_COLOR } from "@constants/design";
import { AMENITIES_GROUP } from "@constants/flower";

interface FlowerGeneratorProps {
  width?: number;
  height?: number;
}

function FlowerGenerator(props: FlowerGeneratorProps) {
  const amentities_list = useAppSelector((state) => state.flower.amenities);

  function categorize_minutes(list_of_minutes: number[]): [number, number, number] {
    /** [5 mins, 10 mins, 15 mins] */
    const categorized_minutes_list: [number, number, number] = [0, 0, 0];

    list_of_minutes.forEach((minute: number) => {
      if (minute <= 5 && minute > 0) {
        categorized_minutes_list[0] = categorized_minutes_list[0] + 1;
      }
      if (minute <= 15 && minute > 5) {
        categorized_minutes_list[1] = categorized_minutes_list[1] + 1;
      }
      if (minute <= 20 && minute > 15) {
        categorized_minutes_list[2] = categorized_minutes_list[2] + 1;
      }
    });

    return categorized_minutes_list;
  }

  function petal_generator(category_name: string) {
    const coefficients = [1, 1.5, 2];
    const opacities = [];

    const amenity_group_items = AMENITIES_GROUP[category_name];
    const amenity_group_travel_times = amenity_group_items.map((amenity: string) => {
      // get the amenity distance by user
      return amentities_list[amenity];
    });

    const MAX_CATEGORIES = amenity_group_items.length;
    // calculate opacities
    categorize_minutes(amenity_group_travel_times)?.forEach(
      (current_category_fallings_inside, index) => {
        const nr_cats_falling_inside = current_category_fallings_inside;
        const nr_cats_in_percentage = nr_cats_falling_inside / MAX_CATEGORIES;
        opacities[index] = (90 / coefficients[index]) * nr_cats_in_percentage;
      }
    );

    return opacities;
  }

  return (
    <svg
      width={props.width || 300}
      height={props.height || 300}
      viewBox="0 0 405 406"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160.375 139.037C166.158 151.644 171.269 164.847 163.559 169.785C155.913 174.665 138.757 167.171 126.292 157.992C113.892 148.87 106.245 138.006 109.008 129.176C111.835 120.403 122.482 118.779 133.919 119.302C145.42 119.825 154.528 126.488 160.375 139.037Z"
        fill={FLOWER_CATEGORIES_COLOR["tourism"]}
        fillOpacity={`${petal_generator("tourism")[0]}%`}
      />
      <path
        d="M158.55 118.659C167.175 139.223 174.799 160.759 163.299 168.814C151.894 176.775 126.305 164.55 107.712 149.577C89.2149 134.699 77.81 116.977 81.9311 102.573C86.148 88.2629 102.029 85.6141 119.088 86.467C136.243 87.3199 149.828 98.189 158.55 118.659Z"
        fill={FLOWER_CATEGORIES_COLOR["tourism"]}
        fillOpacity={`${petal_generator("tourism")[1]}%`}
      />
      <path
        d="M157.482 103.61C168.559 130.709 178.351 159.089 163.58 169.704C148.933 180.194 116.069 164.084 92.1906 144.353C68.435 124.747 53.7877 101.394 59.0804 82.4126C64.4962 63.5557 84.8915 60.0652 106.801 61.1891C128.833 62.3131 146.281 76.636 157.482 103.61Z"
        fill={FLOWER_CATEGORIES_COLOR["tourism"]}
        fillOpacity={`${petal_generator("tourism")[2]}%`}
      />

      <path
        d="M214.261 125.585C210.587 138.96 206.016 152.359 196.935 151.186C187.941 150.009 179.617 133.241 175.968 118.197C172.332 103.239 173.458 90.002 181.251 85.0132C189.055 80.1103 198.255 85.7099 206.68 93.4619C215.154 101.255 217.848 112.214 214.261 125.585Z"
        fill={FLOWER_CATEGORIES_COLOR["transport"]}
        fillOpacity={`${petal_generator("transport")[0]}%`}
      />
      <path
        d="M225.962 108.801C219.351 130.099 211.348 151.497 197.361 150.275C183.507 149.042 171.763 123.229 167.144 99.808C162.538 76.5208 165.193 55.6146 177.609 47.2291C190.037 38.9778 203.905 47.1565 216.425 58.7754C229.019 70.4559 232.439 87.5146 225.962 108.801Z"
        fill={FLOWER_CATEGORIES_COLOR["transport"]}
        fillOpacity={`${petal_generator("transport")[1]}%`}
      />
      <path
        d="M234.817 96.5868C225.884 124.466 215.143 152.501 197.005 151.138C179.042 149.759 164.221 116.293 158.612 85.8296C153.017 55.5406 156.807 28.2364 173.063 17.0975C189.333 6.13348 207.2 16.5695 223.261 31.5135C239.416 46.5366 243.575 68.7236 234.817 96.5868Z"
        fill={FLOWER_CATEGORIES_COLOR["transport"]}
        fillOpacity={`${petal_generator("transport")[2]}%`}
      />

      <path
        d="M262.234 149.371C250.823 157.255 238.708 164.581 232.506 157.845C226.373 151.163 230.774 132.967 237.649 119.097C244.479 105.301 253.85 95.8845 263.026 97.072C272.156 98.3328 275.604 108.536 277.075 119.89C278.557 131.307 273.577 141.433 262.234 149.371Z"
        fill={FLOWER_CATEGORIES_COLOR["sport"]}
        fillOpacity={`${petal_generator("sport")[0]}%`}
      />
      <path
        d="M281.986 144.035C263.232 156.1 243.346 167.348 233.417 157.421C223.597 147.571 231.192 120.248 242.709 99.3379C254.15 78.5383 269.621 64.2294 284.523 65.7866C299.347 67.4546 304.713 82.6339 306.836 99.5823C308.975 116.625 300.63 131.891 281.986 144.035Z"
        fill={FLOWER_CATEGORIES_COLOR["sport"]}
        fillOpacity={`${petal_generator("sport")[1]}%`}
      />
      <path
        d="M296.621 140.369C271.857 155.984 245.608 170.555 232.59 157.853C219.716 145.25 229.874 110.087 245.159 83.1453C260.342 56.346 280.796 37.8662 300.409 39.7823C319.92 41.8413 326.899 61.3207 329.597 83.0923C332.316 104.985 321.24 124.655 296.621 140.369Z"
        fill={FLOWER_CATEGORIES_COLOR["sport"]}
        fillOpacity={`${petal_generator("sport")[2]}%`}
      />

      <path
        d="M285.768 198.646C271.959 197.35 257.969 195.175 257.548 186.029C257.145 176.967 272.213 165.857 286.394 159.652C300.494 153.473 313.725 152.284 319.992 159.092C326.175 165.926 322.258 175.958 316.087 185.602C309.883 195.301 299.559 199.856 285.768 198.646Z"
        fill={FLOWER_CATEGORIES_COLOR["health"]}
        fillOpacity={`${petal_generator("health")[0]}%`}
      />
      <path
        d="M304.329 207.254C282.207 204.442 259.744 200.277 258.519 186.289C257.327 172.432 280.709 156.384 302.972 147.768C325.106 139.189 346.156 138.172 356.57 148.944C366.854 159.751 361.207 174.828 351.939 189.175C342.623 203.606 326.417 209.936 304.329 207.254Z"
        fill={FLOWER_CATEGORIES_COLOR["health"]}
        fillOpacity={`${petal_generator("health")[1]}%`}
      />
      <path
        d="M317.896 213.854C288.889 209.898 259.415 204.187 257.607 186.088C255.846 168.159 286.23 147.752 315.257 136.938C344.114 126.169 371.662 125.16 385.454 139.234C399.077 153.353 391.902 172.761 379.974 191.173C367.984 209.692 346.857 217.64 317.896 213.854Z"
        fill={FLOWER_CATEGORIES_COLOR["health"]}
        fillOpacity={`${petal_generator("health")[2]}%`}
      />

      <path
        d="M271.669 250.938C261.923 241.07 252.604 230.411 258.16 223.134C263.676 215.933 282.36 217.108 297.213 221.47C311.985 225.8 322.886 233.394 323.31 242.637C323.654 251.847 314.205 257.014 303.279 260.435C292.292 263.877 281.455 260.731 271.669 250.938Z"
        fill={FLOWER_CATEGORIES_COLOR["food"]}
        fillOpacity={`${petal_generator("food")[0]}%`}
      />
      <path
        d="M280.353 269.464C265.215 253.09 250.684 235.46 258.737 223.957C266.731 212.576 294.958 215.312 317.551 223.023C340.021 230.677 356.799 243.429 357.853 258.375C358.785 273.264 344.768 281.184 328.446 286.217C312.033 291.283 295.55 285.716 280.353 269.464Z"
        fill={FLOWER_CATEGORIES_COLOR["food"]}
        fillOpacity={`${petal_generator("food")[1]}%`}
      />
      <path
        d="M286.504 283.239C266.826 261.563 247.918 238.244 258.167 223.217C268.344 208.35 304.735 212.248 333.922 222.623C362.951 232.921 384.702 249.856 386.221 269.503C387.581 289.075 369.61 299.331 348.637 305.768C327.549 312.248 306.255 304.756 286.504 283.239Z"
        fill={FLOWER_CATEGORIES_COLOR["food"]}
        fillOpacity={`${petal_generator("food")[2]}%`}
      />

      <path
        d="M226.74 282.582C225.618 268.757 225.33 254.603 234.265 252.599C243.119 250.629 256.676 263.539 265.25 276.428C273.783 289.24 277.252 302.064 271.636 309.417C265.979 316.693 255.419 314.578 244.851 310.175C234.222 305.75 227.942 296.374 226.74 282.582Z"
        fill={FLOWER_CATEGORIES_COLOR["education"]}
        fillOpacity={`${petal_generator("education")[0]}%`}
      />
      <path
        d="M221.485 302.356C220.413 280.081 220.614 257.236 234.176 253.6C247.616 250.021 267.481 270.26 279.831 290.689C292.124 310.997 296.78 331.55 287.981 343.677C279.124 355.681 263.295 352.739 247.556 346.103C231.727 339.434 222.679 324.574 221.485 302.356Z"
        fill={FLOWER_CATEGORIES_COLOR["education"]}
        fillOpacity={`${petal_generator("education")[1]}%`}
      />
      <path
        d="M217.341 316.862C216.2 287.608 216.706 257.591 234.216 252.668C251.567 247.82 276.94 274.199 292.63 300.907C308.247 327.455 314.024 354.409 302.558 370.436C291.02 386.304 270.661 382.608 250.457 374.058C230.138 365.467 218.641 346.04 217.341 316.862Z"
        fill={FLOWER_CATEGORIES_COLOR["education"]}
        fillOpacity={`${petal_generator("education")[2]}%`}
      />

      <path
        d="M171.929 278.248C179.956 266.937 188.834 255.909 196.966 260.117C205.015 264.298 207.103 282.903 205.386 298.287C203.687 313.587 198.101 325.641 189.072 327.663C180.062 329.601 173.332 321.193 168.066 311.027C162.769 300.805 163.985 289.586 171.929 278.248Z"
        fill={FLOWER_CATEGORIES_COLOR["services"]}
        fillOpacity={`${petal_generator("services")[0]}%`}
      />
      <path
        d="M155.193 290.018C168.689 272.266 183.528 254.895 196.255 260.827C208.851 266.724 211.059 294.997 207.388 318.586C203.751 342.044 194.107 360.781 179.571 364.414C165.07 367.917 154.836 355.489 147.045 340.289C139.206 325.005 141.826 307.805 155.193 290.018Z"
        fill={FLOWER_CATEGORIES_COLOR["services"]}
        fillOpacity={`${petal_generator("services")[1]}%`}
      />
      <path
        d="M142.695 298.467C160.625 275.324 180.307 252.654 196.884 260.138C213.293 267.578 215.773 304.094 210.625 334.639C205.523 365.015 192.623 389.376 173.538 394.284C154.499 399.022 141.279 383.104 131.298 363.568C121.255 343.926 124.935 321.654 142.695 298.467Z"
        fill={FLOWER_CATEGORIES_COLOR["services"]}
        fillOpacity={`${petal_generator("services")[2]}%`}
      />

      <path
        d="M132.629 239.083C146.049 235.577 159.938 232.836 163.463 241.287C166.941 249.664 156.581 265.257 145.377 275.939C134.241 286.567 122.215 292.211 113.998 287.956C105.85 283.649 106.099 272.882 108.6 261.71C111.112 250.474 119.256 242.662 132.629 239.083Z"
        fill={FLOWER_CATEGORIES_COLOR["shop"]}
        fillOpacity={`${petal_generator("shop")[0]}%`}
      />
      <path
        d="M112.243 237.341C133.993 232.418 156.526 228.649 162.461 241.374C168.32 253.988 151.838 277.066 133.864 292.776C115.999 308.408 96.5667 316.563 83.0966 310.003C69.7366 303.365 69.8856 287.266 73.6879 270.614C77.5068 253.867 90.5698 242.376 112.243 237.341Z"
        fill={FLOWER_CATEGORIES_COLOR["shop"]}
        fillOpacity={`${petal_generator("shop")[1]}%`}
      />
      <path
        d="M97.2376 235.78C125.849 229.577 155.498 224.862 163.386 241.251C171.174 257.497 149.602 287.065 126.024 307.154C102.591 327.144 77.0493 337.514 59.275 329.006C41.6449 320.398 41.7491 299.706 46.6604 278.325C51.5932 256.822 68.7283 242.127 97.2376 235.78Z"
        fill={FLOWER_CATEGORIES_COLOR["shop"]}
        fillOpacity={`${petal_generator("shop")[2]}%`}
      />

      <path
        d="M128.585 184.654C141.119 190.595 153.521 197.423 150.789 206.162C148.068 214.815 130.109 220.101 114.66 221.082C99.2978 222.066 86.4574 218.658 82.8977 210.118C79.4245 201.58 86.5365 193.493 95.6337 186.542C104.78 179.55 116.04 178.8 128.585 184.654Z"
        fill="#FFAB00"
        fillOpacity={"20%"}
      />
      <path
        d="M114.088 170.216C133.914 180.425 153.598 192.022 149.966 205.585C146.346 219.014 118.885 226.098 95.018 226.579C71.2849 227.071 51.1571 220.827 45.055 207.143C39.0873 193.471 49.5499 181.234 63.1663 170.922C76.8562 160.548 94.2497 160.142 114.088 170.216Z"
        fill="#FFAB00"
        fillOpacity={"30%"}
      />
      <path
        d="M103.597 159.375C129.502 173.014 155.245 188.46 150.753 206.086C146.275 223.537 110.745 232.32 79.77 232.555C48.9695 232.805 22.7383 224.331 14.5914 206.388C6.61918 188.462 19.9992 172.678 37.5052 159.456C55.1054 146.155 77.6776 145.912 103.597 159.375Z"
        fill="#FFAB00"
        fillOpacity={"40%"}
      />
    </svg>
  );
}

export const Flower = memo(FlowerGenerator);
