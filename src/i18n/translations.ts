import { Category, DistroFamily } from '@/types'

export type Language = 'en' | 'fr'

type LocalizedStep = {
  title: string
  description: string
}

type LocalizedFaq = {
  question: string
  answer: string
}

type DistroLocalizedInfo = {
  title: string
  description: string
  shortDescription: string
  maintenanceCardTitle: string
}

export interface AppMessages {
  navbar: {
    starOnGitHub: string
    starAria: string
  }
  languageToggle: {
    aria: string
  }
  themeToggle: {
    switchToDark: string
    switchToLight: string
  }
  hero: {
    title: string
    description: string
    startBuilding: string
    badges: {
      manualReview: string
      oneGroupedCommand: string
      manualExecution: string
    }
  }
  home: {
    seoTitle: string
    howItWorksTitle: string
    howItWorksDescription: string
    steps: LocalizedStep[]
    whyTrustTitle: string
    whyTrustDescription: string
    trustCards: {
      noHiddenExecutionTitle: string
      noHiddenExecutionBody: string
      fullControlTitle: string
      fullControlBody: string
      oneCleanOutputTitle: string
      oneCleanOutputBody: string
    }
  }
  faq: {
    title: string
    description: string
    items: LocalizedFaq[]
  }
  footer: {
    navigation: string
    distros: string
    home: string
    distroChooser: string
    arch: string
    fedora: string
    debian: string
    brandDescription: string
    manualNotice: string
    copyright: string
  }
  chooserPage: {
    seoTitle: string
    seoDescription: string
    title: string
    description: string
    archDescription: string
    fedoraDescription: string
    debianDescription: string
    archLogoAlt: string
    fedoraLogoAlt: string
    debianLogoAlt: string
  }
  distroPage: {
    seoTitleSuffix: string
    maintenanceSectionTitle: string
    maintenanceSectionDescription: string
    packageSelectionTitle: string
    packageSelectionDescription: string
    selected: string
    noPackagesMatch: string
    clearSelection: string
    getYourLilite: string
    yourLiliteCommand: string
    selectPackagesPlaceholder: string
  }
  common: {
    back: string
    copyCommand: string
    copied: string
    searchPackagesAria: string
    searchPlaceholder: string
    filterByCategoryAria: string
    all: string
    openPackageBuilder: string
    selectLabelPrefix: string
  }
  notFound: {
    seoTitle: string
    seoDescription: string
    title: string
    description: string
    backToHome: string
    codeLabel: string
  }
  terminalPreview: {
    title: string
    placeholder: string
    reviewMessage: string
  }
  categories: Record<Category, string>
  distroInfo: Record<DistroFamily, DistroLocalizedInfo>
}

export const translations: Record<Language, AppMessages> = {
  en: {
    navbar: {
      starOnGitHub: 'Star on GitHub',
      starAria: 'Star Lilite on GitHub',
    },
    languageToggle: {
      aria: 'Switch language',
    },
    themeToggle: {
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    hero: {
      title: 'Build Linux install commands with clarity, not guesswork',
      description:
        'Select packages from official repositories and generate one grouped install command. Lilite never executes anything automatically.',
      startBuilding: 'Start Building',
      badges: {
        manualReview: 'Manual review',
        oneGroupedCommand: 'One grouped command',
        manualExecution: 'Manual execution',
      },
    },
    home: {
      seoTitle: 'Lilite | Linux Command Builder',
      howItWorksTitle: 'How Lilite Works',
      howItWorksDescription: 'A fast four-step flow built for transparency and control.',
      steps: [
        {
          title: 'Choose your distro family',
          description: 'Pick Arch-based, Debian-based, or Fedora-based so command syntax is correct from the start.',
        },
        {
          title: 'Find and select packages',
          description: 'Use category filters and search to quickly choose only what you need.',
        },
        {
          title: 'Review one grouped command',
          description: 'The preview updates live and always stays as one install command.',
        },
        {
          title: 'Copy and run manually',
          description: 'You keep full control by running the command yourself in your terminal.',
        },
      ],
      whyTrustTitle: 'Why Trust Lilite',
      whyTrustDescription: 'Built to stay minimal, inspectable, and predictable.',
      trustCards: {
        noHiddenExecutionTitle: 'No Hidden Execution',
        noHiddenExecutionBody: 'No login, no backend APIs, and no remote command execution.',
        fullControlTitle: 'Full control',
        fullControlBody: 'Review, copy, and run commands yourself in your own terminal.',
        oneCleanOutputTitle: 'One clean output',
        oneCleanOutputBody: 'Package selections are grouped into one clear install command.',
      },
    },
    faq: {
      title: 'FAQ',
      description: 'Quick answers about how Lilite keeps package installation safe, transparent, and fully manual.',
      items: [
        {
          question: 'Does Lilite install software automatically?',
          answer: 'No. Lilite only generates commands. You manually copy, review, and run them in your terminal.',
        },
        {
          question: 'Where do package names come from?',
          answer: 'Lilite uses local typed datasets with package names from official repositories for each supported distro family.',
        },
        {
          question: 'Can Lilite generate scripts?',
          answer: 'No. Lilite intentionally outputs one grouped install command to keep behavior transparent and easy to inspect.',
        },
        {
          question: 'Are third-party package sources supported?',
          answer: 'No. Flatpak, Snap, AUR, COPR, AppImage, and external repositories are intentionally excluded.',
        },
      ],
    },
    footer: {
      navigation: 'Navigation',
      distros: 'Distros',
      home: 'Home',
      distroChooser: 'Distro Chooser',
      arch: 'Arch',
      fedora: 'Fedora',
      debian: 'Debian',
      brandDescription:
        'Lilite is a Linux command builder that helps you generate one grouped install command from official repositories for Arch-based, Debian-based, and Fedora-based systems.',
      manualNotice: 'Manual review and execution only. No auto-installation. No external repositories.',
      copyright: 'All rights reserved.',
    },
    chooserPage: {
      seoTitle: 'Choose Distro Family',
      seoDescription:
        'Select Arch, Fedora, or Debian family to build one grouped Linux install command with official repository package names.',
      title: 'Choose Your Distro Family',
      description: 'Pick your distro family to generate package commands with the correct package manager and package names.',
      archDescription: 'Pacman workflow for Arch Linux and related distributions.',
      fedoraDescription: 'DNF workflow for Fedora and Fedora-like RPM systems.',
      debianDescription: 'Apt workflow for Debian, Ubuntu, and Debian derivatives.',
      archLogoAlt: 'Arch Linux logo',
      fedoraLogoAlt: 'Fedora logo',
      debianLogoAlt: 'Debian logo',
    },
    distroPage: {
      seoTitleSuffix: 'Package Builder',
      maintenanceSectionTitle: 'System Maintenance Commands',
      maintenanceSectionDescription: 'Run these maintenance commands before installing additional packages.',
      packageSelectionTitle: 'Package Selection',
      packageSelectionDescription:
        'Filter package cards, select what you need, then click Get Your Lilite to generate one grouped install command.',
      selected: 'Selected',
      noPackagesMatch: 'No packages match your current search and category filters.',
      clearSelection: 'Clear Selection',
      getYourLilite: 'Get Your Lilite',
      yourLiliteCommand: 'Your Lilite Command',
      selectPackagesPlaceholder: '# Select packages to generate your command',
    },
    common: {
      back: 'Back',
      copyCommand: 'Copy Command',
      copied: 'Copied',
      searchPackagesAria: 'Search packages',
      searchPlaceholder: 'Search by app, package, or description',
      filterByCategoryAria: 'Filter packages by category',
      all: 'All',
      openPackageBuilder: 'Open package builder',
      selectLabelPrefix: 'Select',
    },
    notFound: {
      seoTitle: 'Page Not Found',
      seoDescription: 'The page you requested could not be found. Return to Lilite and continue building safe Linux install commands.',
      title: 'Page not found',
      description: 'The page you requested does not exist. Return home and continue with Lilite.',
      backToHome: 'Back to Home',
      codeLabel: '404',
    },
    terminalPreview: {
      title: 'Terminal Preview',
      placeholder: '# Select packages to generate one grouped install command',
      reviewMessage: 'Review this command before running it in your own terminal.',
    },
    categories: {
      Browsers: 'Browsers',
      Development: 'Development',
      Communication: 'Communication',
      Media: 'Media',
      Utilities: 'Utilities',
      Terminals: 'Terminals',
      Others: 'Others',
    },
    distroInfo: {
      'arch-based': {
        title: 'Famille Arch',
        description:
          'Arch-based distributions use pacman. Select from curated packages in official repositories and generate one grouped install command.',
        shortDescription: 'Rolling-release systems using pacman and official repositories.',
        maintenanceCardTitle: 'Refresh and upgrade system',
      },
      'debian-based': {
        title: 'Famille Debian',
        description:
          'Debian-based distributions use apt. Choose commonly used packages and copy one grouped install command for manual execution.',
        shortDescription: 'Stable systems using apt and official package sources.',
        maintenanceCardTitle: 'Refresh and upgrade system',
      },
      'fedora-based': {
        title: 'Famille Fedora',
        description:
          'Fedora-based distributions use dnf. Pick useful official-repo packages and generate one clean grouped install command.',
        shortDescription: 'RPM-based systems powered by dnf and official repositories.',
        maintenanceCardTitle: 'Refresh and upgrade system',
      },
    },
  },
  fr: {
    navbar: {
      starOnGitHub: 'Star sur GitHub',
      starAria: 'Mettre Lilite en favori sur GitHub',
    },
    languageToggle: {
      aria: 'Changer la langue',
    },
    themeToggle: {
      switchToDark: 'Passer en mode sombre',
      switchToLight: 'Passer en mode clair',
    },
    hero: {
      title: "Créez des commandes d'installation Linux claires, sans approximation",
      description:
        "Sélectionnez des paquets depuis les dépôts officiels et générez une seule commande d'installation groupée. Lilite n'exécute rien automatiquement.",
      startBuilding: 'Commencer',
      badges: {
        manualReview: 'Vérification manuelle',
        oneGroupedCommand: 'Une commande groupée',
        manualExecution: 'Exécution manuelle',
      },
    },
    home: {
      seoTitle: 'Lilite | Generateur de commandes Linux',
      howItWorksTitle: 'Comment Lilite fonctionne',
      howItWorksDescription: 'Un flux simple en quatre étapes, pensé pour la transparence et le contrôle.',
      steps: [
        {
          title: 'Choisissez votre famille de distribution',
          description: "Choisissez Arch-based, Debian-based ou Fedora-based pour avoir la bonne syntaxe dès le départ.",
        },
        {
          title: 'Trouvez et sélectionnez vos paquets',
          description: 'Utilisez les filtres par catégorie et la recherche pour choisir rapidement ce dont vous avez besoin.',
        },
        {
          title: 'Vérifiez une commande groupée',
          description: "L'aperçu se met à jour en direct et reste toujours une seule commande d'installation.",
        },
        {
          title: 'Copiez et exécutez manuellement',
          description: 'Vous gardez le contrôle total en lançant vous-même la commande dans votre terminal.',
        },
      ],
      whyTrustTitle: 'Pourquoi faire confiance à Lilite',
      whyTrustDescription: 'Conçu pour rester minimal, prévisible et facile à inspecter.',
      trustCards: {
        noHiddenExecutionTitle: 'Aucune exécution cachée',
        noHiddenExecutionBody: 'Pas de connexion, pas d’API backend, et aucune exécution distante.',
        fullControlTitle: 'Contrôle total',
        fullControlBody: 'Vérifiez, copiez et exécutez les commandes vous-même dans votre terminal.',
        oneCleanOutputTitle: 'Un résultat clair',
        oneCleanOutputBody: 'Les sélections de paquets sont regroupées dans une seule commande lisible.',
      },
    },
    faq: {
      title: 'FAQ',
      description: 'Réponses rapides sur la manière dont Lilite garde une installation sûre, transparente et 100% manuelle.',
      items: [
        {
          question: 'Lilite installe-t-il les logiciels automatiquement ?',
          answer: 'Non. Lilite génère uniquement des commandes. Vous copiez, vérifiez et exécutez manuellement dans votre terminal.',
        },
        {
          question: 'D’où viennent les noms de paquets ?',
          answer: 'Lilite utilise des jeux de données typés locaux avec des noms issus des dépôts officiels pour chaque famille supportée.',
        },
        {
          question: 'Lilite peut-il générer des scripts ?',
          answer: 'Non. Lilite produit volontairement une seule commande groupée pour garder un comportement transparent et vérifiable.',
        },
        {
          question: 'Les sources de paquets tierces sont-elles supportées ?',
          answer: 'Non. Flatpak, Snap, AUR, COPR, AppImage et les dépôts externes sont volontairement exclus.',
        },
      ],
    },
    footer: {
      navigation: 'Navigation',
      distros: 'Distros',
      home: 'Accueil',
      distroChooser: 'Choix de distro',
      arch: 'Arch',
      fedora: 'Fedora',
      debian: 'Debian',
      brandDescription:
        "Lilite est un générateur de commandes Linux qui vous aide à créer une seule commande d'installation groupée à partir des dépôts officiels pour les systèmes Arch-based, Debian-based et Fedora-based.",
      manualNotice: 'Vérification et exécution manuelles uniquement. Pas d’auto-installation. Aucun dépôt externe.',
      copyright: 'Tous droits réservés.',
    },
    chooserPage: {
      seoTitle: 'Choisir une famille de distro',
      seoDescription:
        "Choisissez Arch, Fedora ou Debian pour générer une seule commande Linux groupée avec les bons noms de paquets officiels.",
      title: 'Choisissez votre famille de distribution',
      description: 'Choisissez votre famille de distro pour générer des commandes avec le bon gestionnaire de paquets.',
      archDescription: 'Flux pacman pour Arch Linux et distributions associées.',
      fedoraDescription: 'Flux dnf pour Fedora et systèmes RPM similaires.',
      debianDescription: 'Flux apt pour Debian, Ubuntu et dérivées Debian.',
      archLogoAlt: 'Logo Arch Linux',
      fedoraLogoAlt: 'Logo Fedora',
      debianLogoAlt: 'Logo Debian',
    },
    distroPage: {
      seoTitleSuffix: 'Générateur de paquets',
      maintenanceSectionTitle: 'Commandes de maintenance système',
      maintenanceSectionDescription: "Exécutez ces commandes de maintenance avant d'installer d'autres paquets.",
      packageSelectionTitle: 'Sélection des paquets',
      packageSelectionDescription:
        "Filtrez les cartes de paquets, sélectionnez ce dont vous avez besoin, puis cliquez sur Obtenir votre Lilite pour générer une seule commande groupée.",
      selected: 'Sélectionnés',
      noPackagesMatch: 'Aucun paquet ne correspond à vos filtres actuels.',
      clearSelection: 'Vider la sélection',
      getYourLilite: 'Obtenir votre Lilite',
      yourLiliteCommand: 'Votre commande Lilite',
      selectPackagesPlaceholder: '# Sélectionnez des paquets pour générer votre commande',
    },
    common: {
      back: 'Retour',
      copyCommand: 'Copier la commande',
      copied: 'Copié',
      searchPackagesAria: 'Rechercher des paquets',
      searchPlaceholder: 'Rechercher par application, paquet ou description',
      filterByCategoryAria: 'Filtrer les paquets par catégorie',
      all: 'Tous',
      openPackageBuilder: 'Ouvrir le générateur',
      selectLabelPrefix: 'Sélectionner',
    },
    notFound: {
      seoTitle: 'Page introuvable',
      seoDescription: 'La page demandée est introuvable. Revenez sur Lilite pour continuer à générer vos commandes Linux.',
      title: 'Page introuvable',
      description: "La page demandée n'existe pas. Revenez à l'accueil pour continuer avec Lilite.",
      backToHome: "Retour à l'accueil",
      codeLabel: '404',
    },
    terminalPreview: {
      title: 'Aperçu terminal',
      placeholder: '# Sélectionnez des paquets pour générer une seule commande groupée',
      reviewMessage: "Vérifiez cette commande avant de l'exécuter dans votre terminal.",
    },
    categories: {
      Browsers: 'Navigateurs',
      Development: 'Développement',
      Communication: 'Communication',
      Media: 'Média',
      Utilities: 'Utilitaires',
      Terminals: 'Terminaux',
      Others: 'Autres',
    },
    distroInfo: {
      'arch-based': {
        title: 'Arch-based',
        description:
          "Les distributions Arch-based utilisent pacman. Sélectionnez des paquets des dépôts officiels et générez une seule commande groupée.",
        shortDescription: 'Systèmes rolling-release utilisant pacman et les dépôts officiels.',
        maintenanceCardTitle: 'Actualiser et mettre à niveau le système',
      },
      'debian-based': {
        title: 'Debian-based',
        description:
          "Les distributions Debian-based utilisent apt. Choisissez des paquets courants et copiez une seule commande groupée pour une exécution manuelle.",
        shortDescription: 'Systèmes stables utilisant apt et des sources officielles.',
        maintenanceCardTitle: 'Actualiser et mettre à niveau le système',
      },
      'fedora-based': {
        title: 'Fedora-based',
        description:
          'Les distributions Fedora-based utilisent dnf. Choisissez des paquets utiles des dépôts officiels et générez une commande groupée claire.',
        shortDescription: 'Systèmes RPM utilisant dnf et les dépôts officiels.',
        maintenanceCardTitle: 'Actualiser et mettre à niveau le système',
      },
    },
  },
}
