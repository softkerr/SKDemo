export interface TranslationResource {
  common: {
    home: string;
    services: string;
    about: string;
    contact: string;
    welcome: string;
    learnMore: string;
  };
  home: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroDescription: string;
    featuresTitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
  services: {
    title: string;
    subtitle: string;
    service1Title: string;
    service1Description: string;
    service1Price: string;
    service2Title: string;
    service2Description: string;
    service2Price: string;
    service3Title: string;
    service3Description: string;
    service3Price: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission: string;
    missionText: string;
    vision: string;
    visionText: string;
    values: string;
    valuesText: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitButton: string;
    addressTitle: string;
    address: string;
    phoneTitle: string;
    phone: string;
    emailTitle: string;
    email: string;
  };
}
