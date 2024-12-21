export const roles = [
  {
    name: 'ADMIN',
    context: 'enterprise',
    description:
      'Administrador principal de la empresa. Gestiona usuarios, permisos y la configuración general de la organización.',
  },
  {
    name: 'COMMUNITY_MANAGER',
    context: 'enterprise',
    description:
      'Responsable de gestionar la comunicación de la empresa en redes sociales y plataformas digitales. Diseña estrategias de contenido y supervisa la interacción con la comunidad.',
  },
  {
    name: 'EMPLOYER',
    context: 'enterprise',
    description:
      'Reclutador o representante de la empresa encargado de gestionar ofertas laborales y seleccionar candidatos.',
  },
  {
    name: 'EMPLOYEE',
    context: 'enterprise',
    description:
      'Colaborador o trabajador de la empresa que desempeña tareas específicas según su rol asignado.',
  },

  {
    name: 'ADMIN',
    context: 'platform',
    description:
      'Administrador de la plataforma, responsable de la gestión y mantenimiento general de la aplicación.',
  },
  {
    name: 'USER',
    context: 'platform',
    description:
      'Usuario de la plataforma, con acceso a las funcionalidades básicas de la aplicación.',
  },
  {
    name: 'MODERATOR',
    context: 'platform',
    description:
      'Moderador de la plataforma, encargado de supervisar y regular el contenido y las interacciones de los usuarios.',
  },

  {
    name: 'ADMIN',
    context: 'forum',
    description:
      'Administrador del foro, responsable de la gestión y mantenimiento de las discusiones y usuarios del foro.',
  },
  {
    name: 'MODERATOR',
    context: 'forum',
    description:
      'Moderador del foro, encargado de supervisar y regular las discusiones y el comportamiento de los usuarios en el foro.',
  },
  {
    name: 'MEMBER',
    context: 'forum',
    description:
      'Miembro del foro, participante activo en las discusiones y actividades del foro.',
  },
];
