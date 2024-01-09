import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginAuthDto, SignUpAuthDto } from './dto/auth.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(loginAuthDto: LoginAuthDto) {
    let response;

    const fetchedData = await axios.get(
      `${process.env.NEST_DATABASE_URL}/users`,
    );
    const { data } = fetchedData;

    let validationData;

    if (data?.length > 0) {
      validationData = data?.filter(
        (datum) =>
          datum.email === loginAuthDto.email &&
          datum.password === loginAuthDto.password,
      );
      if (validationData.length === 1) return validationData[0];
      response = false;
    }
    response = false;

    if (response) {
      const { id } = response;

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
    const fetchedData = await axios.get(
      `${process.env.NEST_DATABASE_URL}/users`,
    );
    const { data } = fetchedData;

    let validationData;

    if (data?.length > 0) {
      validationData = data.filter(
        (datum) => datum.email === signUpAuthDto.email,
      );
      console.log(validationData);
      if (validationData?.length > 0) {
        throw new BadRequestException('Email already registered!');
      } else {
      }
    }

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
