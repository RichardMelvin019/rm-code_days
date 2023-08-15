#include <stdio.h>
#include <stdlib.h>

int main(void)
{
	const char *variable_name = "MELVIN";
	const char *variable_value = "coding in c!";
	int overwrite = 1;

	setenv(variable_name, variable_value, overwrite);
	char *env_value = getenv(variable_name);
	if (env_value != NULL)
		printf("%s=%s\n", variable_name, env_value);
	else
		printf("Environment variable not set\n");
	return (0);
}
