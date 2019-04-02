import { describe } from 'mocha';
import axios from 'axios';
import {getUrl} from '../Commons';
import { expect } from 'chai';
import AuthController from '../../web/controllers/AuthController';
import { IResourceRepository } from '../../web/repositories/IResourceRepository';
import RepositoryFactory from '../../web/repositories/RepositoryFactory';
import CryptoHelper from '../../web/CryptoHelper';
import {IUser} from "../../web/schemas/IUser";
import {App} from "../../web/Server";

describe('Middleware', () => {
  let userRepository: IResourceRepository<IUser>;
  let authController: AuthController;
  let user: IUser;
  let token: string;
  let app: App;
  const port: number = 9999;

  before(async () => {
    app = new App();
    await app.initialiseServer();
    app.startServer(port);

    userRepository = RepositoryFactory.getRepository('user');
    authController = new AuthController();

    const username: string = 'tester-middleware';
    const password: string  = 'secret';

    user = await userRepository.store({ username, password, iv: CryptoHelper.getRandomString(16) });
    token = await authController.generateToken(user);
  });

  after(async () => {
    await userRepository.destroy(user._id);
    await app.tearDownServer();
  });

  describe('Authentication', () => {
    describe('Require token', () => {
      it('Should reject request if no token is given', async () => {
        try {
          await axios.get(`${getUrl(port)}/api/user/${user._id}`);
        } catch (error) {
          expect(error.response.status).to.equal(401);
        }
      });

      it('Should reject request if the token is invalid', async () => {
        const invToken = `${token}0`;
        try {
          await axios.get(`${getUrl(port)}/api/user/${user._id}`, { headers: { 'x-access-token': invToken } });
        } catch (error) {
          expect(error.response.status).to.equal(401);
        }
      });
    });
  });
});
