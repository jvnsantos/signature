import ROLES_ENUM from "@/shared/enum/roles.enum";

const DashboardIcon = <i className="fe fe-home side-menu__icon"></i>;
const DollarSign = <i className="fe fe-dollar-sign side-menu__icon"></i>;
const UsersIcon = <i className="fe fe-users side-menu__icon"></i>;
const ScheduleIcon = <i className="fe fe-calendar side-menu__icon"></i>;
const TruckIcon = <i className="bi bi-truck side-menu__icon"></i>
const ClientIcon = <i className="bi bi-person-badge side-menu__icon"></i>
const ManagerIcon = <i className="bi bi-code-slash side-menu__icon"></i>
const FinancialIcon = <i className="bi bi-bank2 side-menu__icon"></i>
const SettingsIcon = <i className="bi bi-gear side-menu__icon"></i>
const PORTAL_PREFIX = '/portal/'
const CLIENTS_PREFIX = `${PORTAL_PREFIX}clientes/`
const PAYMENTS_PREFIX = `${PORTAL_PREFIX}cobrancas/`
const SCHEDULE_PREFIX = `${PORTAL_PREFIX}agendamentos/`
const DRIVE_PREFIX = `${PORTAL_PREFIX}motorista/`
const USERS_PREFIX = `${PORTAL_PREFIX}usuarios/`

export const MENUITEMS: any = [
  {
    path: "/portal/dashboard",
    icon: DashboardIcon,
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    title: "Dashboard",
    roles: [ROLES_ENUM.DASHBOARD_HOME]
  },
  {
    title: "Cobranças",
    icon: DollarSign,
    type: "sub",
    active: false,
    selected: false,
    roles: [
      ROLES_ENUM.PAYMENT_FIND],
    children: [
      {
        path: `${PAYMENTS_PREFIX}minhas-cobrancas`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Minhas cobranças",
        roles: [ROLES_ENUM.PAYMENT_FIND,]
      },
      {
        path: `${PAYMENTS_PREFIX}nova-cobranca`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Nova cobrança",
        roles: [
          ROLES_ENUM.PAYMENT_CREATE,
          ROLES_ENUM.CLIENT_FIND,
          ROLES_ENUM.DRIVER_FIND,
        ]
      },
      {
        path: `${PAYMENTS_PREFIX}importar`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Importar",
        roles: [
          ROLES_ENUM.PAYMENT_CREATE,]
      },
      {
        path: `${PAYMENTS_PREFIX}meus-lotes`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Meus lotes",
        roles: [
          ROLES_ENUM.PAYMENT_FIND,]
      },
      {
        path: `${PAYMENTS_PREFIX}conciliacao`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Conciliação",
        roles: [
          ROLES_ENUM.PAYMENT_UPDATE,]
      },
      // {
      //   path: `${PAYMENTS_PREFIX}falha-importacao`,
      //   type: "link",
      //   active: false,
      //   selected: false,
      //   dirchange: false,
      //   title: "Logs",
      //   roles: [
      //     ROLES_ENUM.PAYMENT_FIND,]
      // },
    ],
  },
  {
    title: "Agendamentos",
    icon: ScheduleIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [
      ROLES_ENUM.SCHEDULE_FIND,
    ],
    children: [
      {
        path: `${SCHEDULE_PREFIX}meus-agendamentos`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Meus Agendamentos",
        roles: [
          ROLES_ENUM.PAYMENT_FIND,
        ],
      },
      {
        path: `${SCHEDULE_PREFIX}novo-agendamento`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Novo agendamento",
        roles: [
          ROLES_ENUM.SCHEDULE_CREATE,
          ROLES_ENUM.CLIENT_FIND,
          ROLES_ENUM.DRIVER_FIND
        ],
      },
    ],
  },
  {
    title: "Clientes",
    icon: UsersIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [ROLES_ENUM.CLIENT_FIND],
    children: [
      {
        path: `${CLIENTS_PREFIX}meus-clientes`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Meus Clientes",
        roles: [ROLES_ENUM.CLIENT_FIND],
      },
      {
        path: `${CLIENTS_PREFIX}novo-cliente`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Novo cliente",
        roles: [ROLES_ENUM.CLIENT_CREATE],
      },
      {
        path: `${CLIENTS_PREFIX}importar`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Importar",
        roles: [ROLES_ENUM.CLIENT_CREATE],
      },
    ],
  },

  {
    title: "Motoristas",
    icon: TruckIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [ROLES_ENUM.DRIVER_FIND],
    children: [
      {
        path: `${DRIVE_PREFIX}lista`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Listar",
        roles: [ROLES_ENUM.DRIVER_FIND]
      },
      {
        path: `${DRIVE_PREFIX}importar`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Importar",
        roles: [ROLES_ENUM.DRIVER_CREATE]
      },
    ],
  },
  {
    title: "Financeiro",
    icon: FinancialIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [
      ROLES_ENUM.LOGS],
    children: [
      {
        path: `/portal/extrato`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Extrato analítico",
      },
      {
        path: `/portal/extrato/consolidado`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Extrato consolidado",
      },
    ],
  },
  {
    title: "Usuários",
    icon: ClientIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [ROLES_ENUM.USER_FIND],
    children: [
      {
        path: `${USERS_PREFIX}listar`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Meus usuários",
        roles: [ROLES_ENUM.USER_FIND],
      },
      {
        path: `${USERS_PREFIX}novo`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Novo usuário",
        roles: [ROLES_ENUM.USER_CREATE],
      },
    ],
  },
  {
    title: "Gerenciamento",
    icon: ManagerIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [
      ROLES_ENUM.LOGS],
    children: [
      {
        path: `/portal/cobrancas/consultar-requisicao`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        roles: [
          ROLES_ENUM.LOGS],
        title: "Consultar Requisição",
      },
      {
        path: `/portal/logs`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        roles: [
          ROLES_ENUM.LOGS],
        title: "Logs",
      },
    ],
  },
  {
    title: "Configurações",
    icon: SettingsIcon,
    type: "sub",
    active: false,
    selected: false,
    roles: [
      ROLES_ENUM.CONFIG_COMPANY_PAYMENT],
    children: [
      {
        path: `/portal/configuracao/regras-cobranca`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        roles: [
          ROLES_ENUM.CONFIG_COMPANY_PAYMENT],
        title: "Regras de cobrança",
      },
      {
        path: `/portal/configuracao/condicao-pagamento`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        roles: [
          ROLES_ENUM.CONFIG_COMPANY_PAYMENT],
        title: "Condições de pagamento",
      },
      {
        path: `/portal/configuracao/integracao-promax`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        roles: [
          ROLES_ENUM.CONFIG_COMPANY_PAYMENT],
        title: "Integração PROMAX",
      },
    ],
  },
];

