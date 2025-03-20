import MDTypography from "components/MDTypography";
export default function datas(date) {
  let eyeBlinks = date.data;
  return {
    rows: Array.from(eyeBlinks, (item, index) => {
      const date = new Date(item.timestamp);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return {
        companies: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {month}.{day}.{year} {hours}:{minutes}
          </MDTypography>
        ),
        completion: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {item.count}
          </MDTypography>
        ),
      };
    }),
  };
}
