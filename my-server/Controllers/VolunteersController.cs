using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
namespace my_server.Controllers;

[ApiController]
[Route("[controller]")]
public class VolunteersController : ControllerBase
{
    public static Volunteer[] Volunteers = new Volunteer[]
    {
    };
    public Schedule schedule = new Schedule { daysByid = arr };
    public static int[] arr = { 1, 2, 3, 4, 5, 6, 7 };
    [HttpGet]
    public Volunteer[] getVolunteers()
    {
        return ReadFromFile();
    }
    [HttpPut]
    [Route("saveV/{ind}")]
    public Volunteer[] saveVolunteer(Volunteer v, int ind)
    {
        Console.WriteLine("in put, ind=" + ind);
        Volunteers[ind] = v;
        WriteMessage(Volunteers);
        Volunteers = ReadFromFile();
        return Volunteers;

    }
    public Volunteer getVoluteersById(int i)
    {
        return Volunteers[i];
    }
    [HttpGet]
    [Route("schedule")]
    public Schedule getScheduling()
    {

        Console.WriteLine("in getScheduling()");
        Console.WriteLine(schedule.daysByid);
        return ReadFromFiles();
    }
    [HttpPut]
    [Route("saveSchedule")]
    public Schedule saveScheduling(Schedule s)
    {
        // schedule = s;
        WriteMessages(s);
        return ReadFromFiles();
    }
    public void WriteMessage(Volunteer[] vols)
    {
        string path = "Controllers/volunteers.json";
        string data = JsonSerializer.Serialize(vols);

        if (System.IO.File.Exists(path))
            System.IO.File.WriteAllText(path, data);
        else
            Console.WriteLine("File not found!");
    }

    public Volunteer[]? ReadFromFile()
    {

        string path = "Controllers/volunteers.json";
        string data;
        if (System.IO.File.Exists(path))
        {
            data = System.IO.File.ReadAllText(path);
            Volunteers = JsonSerializer.Deserialize<Volunteer[]>(data);
            Console.WriteLine(Volunteers[0].Name);
            return Volunteers;
        }
        return null;
    }
    public void WriteMessages(Schedule vols)
    {
        string path = "Controllers/schedule.json";
        string data = JsonSerializer.Serialize(vols);

        if (System.IO.File.Exists(path))
            System.IO.File.WriteAllText(path, data);
        else
            Console.WriteLine("File not found!");
    }

    public Schedule? ReadFromFiles()
    {

        string path = "Controllers/schedule.json";
        string data;
        if (System.IO.File.Exists(path))
        {
            data = System.IO.File.ReadAllText(path);
            schedule = JsonSerializer.Deserialize<Schedule>(data);
            return schedule;
        }
        return null;
    }



}
public class Volunteer
{
    public Volunteer()
    {
        this.Name = "";
        this.Days = "1111111";
        this.Phone = "";
        this.Id = 5;
    }
    public string Name { get; set; }
    public string Days { get; set; }

    public string Phone { get; set; }
    public int Id { get; set; }
}
public class Schedule
{
    public Schedule()
    {
        this.daysByid = new int[7];
    }

    public int[] daysByid { get; set; }
}
