const rules = {
  '/auth': '*',
  '/all-users': ['admin'],
  '/change-password': '*',
  '/': '*'
};

export const isLinkVisible = (user, path) => {
  return user?.role && (rules[path] === '*' || rules[path].includes(user.role));
};

export const navigateWithRules = (user, path) => {
  const paths = Object.keys(rules);
  const { role } = user || {};

  if (!role) {
    return '/auth';
  }

  if (!paths.includes(path)) {
    return navigateWithRules(role, '/');
  }

  if (rules[path] === '*' || rules[path].includes(role)) {
    return path;
  }

  return '/';
};
