import { H2Title, Section, IconLock, Tag } from 'twenty-ui';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsReadDocumentationButton } from '@/settings/developers/components/SettingsReadDocumentationButton';
import { SettingsSSOIdentitiesProvidersListCard } from '@/settings/security/components/SettingsSSOIdentitiesProvidersListCard';
import { SettingsSecurityOptionsList } from '@/settings/security/components/SettingsSecurityOptionsList';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';

export const SettingsSecurity = () => {
  const isSSOEnabled = useIsFeatureEnabled('IS_SSO_ENABLED');

  return (
    <SubMenuTopBarContainer
      title="Security"
      actionButton={<SettingsReadDocumentationButton />}
      links={[
        {
          children: 'Workspace',
          href: getSettingsPagePath(SettingsPath.Workspace),
        },
        { children: 'Security' },
      ]}
    >
      <SettingsPageContainer>
        {isSSOEnabled && (
          <Section>
            <H2Title
              title="SSO"
              description="Configure an SSO connection"
              addornment={
                <Tag
                  text={'Enterprise'}
                  color={'transparent'}
                  Icon={IconLock}
                  variant={'border'}
                />
              }
            />
            <SettingsSSOIdentitiesProvidersListCard />
          </Section>
        )}
        <Section>
          <H2Title
            title="Authentication"
            description="Customize your workspace security"
          />
          <SettingsSecurityOptionsList />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
