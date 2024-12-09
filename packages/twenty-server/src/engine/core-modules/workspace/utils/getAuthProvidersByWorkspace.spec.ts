import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

import { getAuthProvidersByWorkspace } from './getAuthProvidersByWorkspace';

describe('getAuthProvidersByWorkspace', () => {
  const mockWorkspace = {
    isGoogleAuthEnabled: true,
    isPasswordAuthEnabled: true,
    isMicrosoftAuthEnabled: false,
    workspaceSSOIdentityProviders: [
      {
        id: 'sso1',
        name: 'SSO Provider 1',
        type: 'SAML',
        status: 'active',
        issuer: 'sso1.example.com',
      },
    ],
  } as unknown as Workspace;

  it('should return correct auth providers for given workspace', () => {
    const result = getAuthProvidersByWorkspace({
      ...mockWorkspace,
    });

    expect(result).toEqual({
      google: true,
      magicLink: false,
      password: true,
      microsoft: false,
      sso: [
        {
          id: 'sso1',
          name: 'SSO Provider 1',
          type: 'SAML',
          status: 'active',
          issuer: 'sso1.example.com',
        },
      ],
    });
  });

  it('should handle workspace with no SSO providers', () => {
    const result = getAuthProvidersByWorkspace({
      ...mockWorkspace,
      workspaceSSOIdentityProviders: [],
    });

    expect(result).toEqual({
      google: true,
      magicLink: false,
      password: true,
      microsoft: false,
      sso: [],
    });
  });

  it('should disable Microsoft auth if isMicrosoftAuthEnabled is false', () => {
    const result = getAuthProvidersByWorkspace({
      ...mockWorkspace,
      isMicrosoftAuthEnabled: false,
    });

    expect(result).toEqual({
      google: true,
      magicLink: false,
      password: true,
      microsoft: false,
      sso: [
        {
          id: 'sso1',
          name: 'SSO Provider 1',
          type: 'SAML',
          status: 'active',
          issuer: 'sso1.example.com',
        },
      ],
    });
  });
});