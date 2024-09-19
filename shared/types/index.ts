/**
 * Project data fetched from the server.
 * @param {string} id - Project ID
 * @param {string} title - Project title
 * @param {string} createdAt - Project creation date
 * @param {string} description - Project description
 * @param {string[]} technologies - Project technologies
 */
export type Project = {
    id: string;
    title: string;
    createdAt: string;
    description: string;
    technologies: string[];
};

/**
 * Project form data provided by the user.
 * This form data is sent to the server by a POST request.
 * @param {string} title - Project title
 * @param {string} description - Project description
 * @param {string} technologies - Project technologies
 */
export type ProjectFormData = {
    title: string;
    description: string;
    technologies: string;
};

/**
 * API response data from the POST request.
 * @param {string} message - Response message
 * @param {Project} project - Project data
 */
export type ApiResponsePOST = {
    message: string;
    project: Project;
}