import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';

type FormData = {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
};

const schema = yup.object({
  name: yup.string()
    .required("Informe o seu nome"),
  email: yup.string()
    .required("Informe o seu e-mail")
    .email("E-mail inválido"),
  password: yup.string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], "A confirmação da senha não confere"),
});

export function Form() {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  function handleUserRegister(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <ControlledInput
        name="name"
        control={control}
        icon="user"
        placeholder="Nome"
        error={errors.name}
      />

      <ControlledInput
        name="email"
        control={control}
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        error={errors.email}
      />

      <ControlledInput
        name="password"
        control={control}
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        error={errors.password}
      />

      <ControlledInput
        name="passwordConfirm"
        control={control}
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        error={errors.passwordConfirm}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}