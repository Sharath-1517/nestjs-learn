import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EmailAuth, LoginAuthDto, SignUpAuthDto } from './dto/auth.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async userExistCheck(
    type: 'LOGIN' | 'SIGNUP',
    loginAuthDto?: LoginAuthDto,
    signUpAuthDto?: SignUpAuthDto,
  ) {
    const fetchedData = await axios.get(
      `${process.env.NEST_DATABASE_URL}/users`,
    );
    const { data } = fetchedData;

    let validationData;

    if (type === 'LOGIN') {
      console.log(data);
      if (data?.length > 0) {
        validationData = data?.filter(
          (datum) =>
            datum.email === loginAuthDto.email &&
            datum.password === loginAuthDto.password,
        );
        if (validationData.length === 1) return validationData[0];
        return false;
      }
      return false;
    }
    if (type === 'SIGNUP') {
      if (data?.length > 0) {
        validationData = data?.filter(
          (datum) => datum.email === signUpAuthDto.email,
        );
        if (validationData.length > 0) return false;
        else return true;
      }
      return true;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    // if (email.email.length > 0) {
    //   const response = await axios.get(
    //     `${process.env.NEST_DATABASE_URL}/users?email=${email.email}`,
    //   );
    //   return response.data;
    // }

    let response;

    await this.userExistCheck('LOGIN', loginAuthDto, null).then(
      (res) => (response = res),
    );

    if (response) {
      const { id, email } = response;

      const payLoad = {
        userName: response.userName,
        email: response.email,
      };

      const access_token = await this.jwt.signAsync(payLoad, {
        secret: process.env.JWT_SECRET,
      });

      let updatingData = { ...response, jwt_access_token: access_token };

      await axios.patch(
        `${process.env.NEST_DATABASE_URL}/users/${id}`,
        updatingData,
      );

      return {
        jwt_access_token: access_token,
        message: 'Successfully signed in',
        statusCode: 200,
      };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async signup(signUpAuthDto: SignUpAuthDto) {
    let response;
    await this.userExistCheck('SIGNUP', null, signUpAuthDto).then(
      (res) => (response = res),
    );

    if (response === false)
      throw new BadRequestException('Email already registered!');
    else if (response === true) {
      // Creating user validation data
      const updatedData = await axios.post(
        `${process.env.NEST_DATABASE_URL}/users`,
        signUpAuthDto,
      );

      const userDatabaseEntry = {
        userName: signUpAuthDto.userName,
        email: signUpAuthDto.email,
        data: [],
        profile: {
          name: signUpAuthDto.userName,
        },
      };

      await axios.post(
        `${process.env.NEST_DATABASE_URL}/user-data`,
        userDatabaseEntry,
      );

      return {
        statusCode: updatedData.status,
        message: 'Created Account successfully',
        dataStatus: 'Created',
      };
    }
  }
}
