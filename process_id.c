#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
	int result;
	int id = fork();
	if (id == 0)
	{
		sleep(1);
	}
	printf("Current ID: %d, Parent ID: %d\n", getpid(), getppid());
	result = wait(NULL);
	if (result == -1)
		printf("No children to wait for\n");
	else
		printf("%d Finished execution\n", result);
	return (0);
}
