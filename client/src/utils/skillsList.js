export const SKILL_TAXONOMY = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'SQL', 'HTML', 'CSS', 'Bash'],
  frontend: ['React', 'React.js', 'Next.js', 'Vue', 'Vue.js', 'Angular', 'Tailwind CSS', 'Redux', 'GraphQL', 'Vite', 'Webpack'],
  backend: ['Node.js', 'Express', 'Express.js', 'NestJS', 'Django', 'FastAPI', 'Spring Boot', 'REST API', 'GraphQL API', 'Microservices'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'DynamoDB', 'Elasticsearch', 'Supabase', 'Firebase'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Amazon Web Services', 'Terraform', 'CI/CD', 'GitHub Actions', 'Nginx', 'Linux', 'CloudWatch', 'S3', 'EC2'],
  testing: ['Jest', 'Cypress', 'Playwright', 'Vitest', 'Mocha'],
};

export const ALL_SKILLS = Object.values(SKILL_TAXONOMY).flat();
