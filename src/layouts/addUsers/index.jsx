import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// MUI и кастомные компоненты
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MultipleSelectCheckmarks from "components/MDSelect";

// Валидационная схема
const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
  surname: yup.string().required("Фамилия обязательна"),
  phone: yup
    .string()
    .required("Телефон обязателен")
    .matches(/^\+374 \d{2}-\d{3}-\d{3}$/, "Формат: +374 XX-XXX-XXX"),
  email: yup.string().email("Неверный email").required("Email обязателен"),
  birthdate: yup.string().required("Дата рождения обязательна"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),
});

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const phoneNumber = watch("phone", "");
  const [role, setRole] = useState("")
  const formatPhoneNumber = (input) => {
    if (!input) return "";
    const numbersOnly = input.replace(/\D/g, "");
    const countryCode = "+374";
    const code = numbersOnly.slice(3, 5);
    const part1 = numbersOnly.slice(5, 8);
    const part2 = numbersOnly.slice(8, 11);

    return `${countryCode} ${code}-${part1}-${part2}`.trim().replace(/[-]+$/, "");
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted);
  };

  const onSubmit = async (data) => {
    const sendData = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      role: role[0],
      phone: data.phone
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const result = await response.json();
      if (response.ok && result.status) {
        toast.success("Регистрация прошла успешно!");
        reset()
      } else {
        toast.error(result.message || "Произошла ошибка при регистрации");
      }
    } catch (error) {
      toast.error("Ошибка сервера");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ width: 500 }}>
          <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={"10%"}
              mt={-2.5}
              p={1}
              mb={1}
              textAlign="center"
              sx={{ width: 150 }}
            >
              <MDTypography variant="h6" fontWeight="medium" color="white">
                Sign Up
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MultipleSelectCheckmarks
                {...register("role")}
                setRole={(e) => setRole(e)}
                role={role}
              />

              <MDBox mb={2}>
                <MDInput
                  {...register("name")}
                  autoComplete="off"
                  type="text"
                  placeholder="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  FormHelperTextProps={{
                    sx: { color: "red" }, // Красный текст ошибки
                  }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  {...register("surname")}
                  autoComplete="off"
                  type="text"
                  placeholder="Surname"
                  fullWidth
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                  FormHelperTextProps={{
                    sx: { color: "red" }, // Красный текст ошибки
                  }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  {...register("phone")}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  autoComplete="off"
                  type="text"
                  placeholder="Mobile"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  FormHelperTextProps={{
                    sx: { color: "red" }, // Красный текст ошибки
                  }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  {...register("email")}
                  autoComplete="off"
                  type="email"
                  placeholder="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  FormHelperTextProps={{
                    sx: { color: "red" }, // Красный текст ошибки
                  }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  {...register("birthdate")}
                  autoComplete="off"
                  type="date"
                  placeholder="Birth Date"
                  fullWidth
                  error={!!errors.birthdate}
                  helperText={errors.birthdate?.message}
                  FormHelperTextProps={{
                    sx: { color: "red" }, // Красный текст ошибки
                  }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  {...register("password")}
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  FormHelperTextProps={{
                    sx: { color: "red" },
                  }}
                />
              </MDBox>
              <MDBox pb={3} mb={1}>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  NEXT
                </MDButton>
              </MDBox>
            </form>
          </MDBox>
        </Card>
      </Box>
    </DashboardLayout>
  );
};
